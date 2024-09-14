import { Show, observer, useObservable } from '@legendapp/state/react';
import { ScrollView, Text, View } from 'dripsy';
import type { Asset } from 'expo-media-library';
import { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { AlbumDetail } from './album-detail';
import { AlbumList } from './album-list';
import { MediaPickerType } from './media-picker-type';
import type { BottomSheetStackParamsList, OptionType } from '@/types';
import { type LibraryType, useMediaLibrary } from '@/hooks/use-media-library';
import { PagerView, type PagerViewRef } from '@/components/layout/pager-view';
import { Image } from '@/components/ui/image';
import { LoadingOverlay } from '@/components/layout/loading-overlay';
import { Button } from '@/components/form/button';
import { SCREEN_WIDTH } from '@/configs/theme';
import { i18n } from '@/configs/i18n';

const MediaPicker = observer(
	({
		multiple,
		moreOptions = [],
		onSelect,
		closeSheet,
	}: BottomSheetStackParamsList['MediaPicker']) => {
		const { assets, gettingAssets } = useMediaLibrary();
		const library$ = useObservable<LibraryType>();
		const pagerRef = useRef<PagerViewRef>(null);
		const selected$ = useObservable<Asset[]>([]);

		const onAssetPress = (item: Asset) => {
			if (multiple) {
				return;
			}

			selected$.set([item]);
		};

		const options: OptionType[] = useMemo(
			() => [
				{
					code: 'pick_image',
					label: i18n.t('common.select_from_gallery'),
					onPress() {
						pagerRef.current?.scrollTo(1);
					},
				},
				{
					code: 'take_photo',
					label: i18n.t('common.take_picture'),
				},
				...moreOptions,
			],
			[moreOptions],
		);

		return (
			<>
				<Show if={pagerRef.current?.index$.get() === 0}>
					<Image
						source='BackgroundGradientImage'
						sx={{
							width: 'full',
							height: 'full',
							...StyleSheet.absoluteFillObject,
						}}
					/>
				</Show>

				<PagerView ref={pagerRef}>
					<Show if={gettingAssets}>
						<LoadingOverlay />
					</Show>

					<ScrollView showsVerticalScrollIndicator={false}>
						<View
							sx={{
								height: 'screen-height',
								width: 'screen-width',
							}}
						>
							<MediaPickerType onCancel={closeSheet}>
								{options.map((option) => (
									<Button
										key={option.code}
										content={option.label}
										rounded={false}
										schema='white'
										contentSx={{
											textAlign: 'left',
											fontWeight: 'semibold',
											fontSize: 'lg',
										}}
										onPress={() => option.onPress?.()}
									/>
								))}
							</MediaPickerType>
						</View>
					</ScrollView>

					<ScrollView showsVerticalScrollIndicator={false}>
						<View
							sx={{
								height: 'screen-height',
								width: 'screen-width',
								px: 'md',
							}}
						>
							<AlbumList onCancel={() => pagerRef.current?.scrollTo(0)}>
								<View
									sx={{
										flexDirection: 'row',
										flexWrap: 'wrap',
										gap: 'xs',
									}}
								>
									{assets.map((asset) => (
										<View key={asset.album.id}>
											<Button
												variant='transparent'
												onPress={() => {
													library$.set(asset);

													pagerRef.current?.scrollTo(2);
												}}
											>
												<Image
													source={asset?.media?.assets[0]?.uri}
													sx={{
														width: SCREEN_WIDTH / 3 - 15,
														height: SCREEN_WIDTH / 3 - 15,
														borderRadius: 'sm',
													}}
												/>
											</Button>

											<Text
												sx={{
													fontWeight: 'semibold',
													textAlign: 'center',
													mt: 'sm',
												}}
											>
												{asset.album.title}
											</Text>

											<Text
												sx={{
													fontWeight: 'semibold',
													textAlign: 'center',
													color: 'gray500',
												}}
											>
												{asset.album.assetCount}
											</Text>
										</View>
									))}
								</View>
							</AlbumList>
						</View>
					</ScrollView>

					<ScrollView showsVerticalScrollIndicator={false}>
						<View
							sx={{
								height: 'screen-height',
								width: 'screen-width',
								px: 'md',
							}}
						>
							<Show if={library$}>
								<AlbumDetail
									asset={library$.get()}
									onCancel={() => {
										pagerRef.current?.scrollTo(1);
									}}
									onDone={() => {
										onSelect(selected$.get());
										closeSheet();
									}}
								>
									<View
										sx={{
											flexDirection: 'row',
											alignItems: 'center',
											flexWrap: 'wrap',
											mt: 'sm',
											gap: 'xs',
										}}
									>
										{library$.get()?.media.assets.map((item) => (
											<View key={item.id}>
												<Button
													variant='transparent'
													sx={{
														borderWidth: 3,
														borderColor: selected$.find(
															(t) => t.id.get() === item.id,
														)
															? 'primary700'
															: 'transparent',
													}}
													onPress={() => {
														onAssetPress(item);
													}}
												>
													<Image
														source={item.uri}
														sx={{
															width: SCREEN_WIDTH / 3 - 17,
															height: SCREEN_WIDTH / 3 - 17,
															borderRadius: 'sm',
														}}
													/>
												</Button>
											</View>
										))}
									</View>
								</AlbumDetail>
							</Show>
						</View>
					</ScrollView>
				</PagerView>
			</>
		);
	},
);

export { MediaPicker };
