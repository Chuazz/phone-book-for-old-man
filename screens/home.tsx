import { Button } from '@/components/form/button';
import { Search } from '@/components/form/search';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { i18n } from '@/configs/i18n';
import { SCREEN_WIDTH } from '@/configs/theme';
import { app$ } from '@/stores';
import type { ScreenProps } from '@/types';
import { observer, useEffectOnce, useObservable } from '@legendapp/state/react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View } from 'dripsy';
import _ from 'lodash';
import { useRef } from 'react';
import { FlatList, PermissionsAndroid, TouchableOpacity } from 'react-native';
import Contacts, { type Contact } from 'react-native-contacts';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { useModal } from 'react-native-modalfy';

const HomeScreen = observer(({ navigation }: ScreenProps<'HomeScreen'>) => {
	const contacts$ = useObservable<Contact[]>([]);
	const { openModal } = useModal();
	const runOnce = useRef(false);
	const keywords = useObservable('');

	const getData = async () => {
		try {
			const result = (await Contacts.getAll()).filter(
				(t) => t.phoneNumbers.length,
			);

			contacts$.set(result);
		} catch (_error) {}
	};

	const checkPermission = async () => {
		let granted = await PermissionsAndroid.request(
			'android.permission.READ_CONTACTS',
			{
				title: i18n.t('info.app_name'),
				message: i18n.t('permission.this_app_will_read_contacts'),
				buttonPositive: i18n.t('permission.accept'),
			},
		);

		granted = await PermissionsAndroid.request(
			'android.permission.WRITE_CONTACTS',
			{
				title: i18n.t('info.app_name'),
				message: i18n.t('permission.this_app_will_write_contacts'),
				buttonPositive: i18n.t('permission.accept'),
			},
		);

		if (granted === 'denied') {
			return;
		}

		getData();
	};

	useEffectOnce(() => {
		checkPermission();
	}, []);

	useFocusEffect(() => {
		if (runOnce.current) {
			return;
		}

		checkPermission();
		keywords.set('');
		runOnce.current = true;
	});

	return (
		<Screen>
			<FlatList
				refreshing={false}
				data={contacts$.get()}
				contentContainerStyle={{ paddingBottom: 120 }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
				getItemLayout={(_item, index) => ({
					index,
					length: SCREEN_WIDTH,
					offset: SCREEN_WIDTH * index,
				})}
				ListHeaderComponent={
					<ScreenHeader
						sx={{
							backgroundColor: 'white',
							paddingVertical: 'md',
							flexDirection: 'row',
							paddingBottom: 'xl',
						}}
					>
						<Search
							value={keywords.get()}
							onChange={(e) => {
								keywords.set(e);

								if (e) {
									contacts$.set((prev) => {
										return prev.filter(
											(t) =>
												t.displayName.toLowerCase().includes(e) ||
												!!t.phoneNumbers.find((t) => t.number.includes(e)),
										);
									});

									return;
								}

								getData();
							}}
						/>

						<Button
							schema='primary'
							rightIcon='SettingOutLineIcon'
							iconSx={{
								width: app$.font.get(),
								height: app$.font.get(),
							}}
							onPress={() => openModal('SettingModal')}
						/>
					</ScreenHeader>
				}
				stickyHeaderIndices={[0]}
				keyExtractor={(item) => item.recordID}
				ItemSeparatorComponent={() => (
					<View
						sx={{
							height: 1,
							width: '100%',
							backgroundColor: 'gray200',
							my: 'xl',
						}}
					/>
				)}
				renderItem={(data) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('DetailScreen', {
								contact: data.item,
							})
						}
					>
						<View
							sx={{
								gap: 'lg',
								px: 'md',
							}}
						>
							<Text sx={{ fontSize: app$.font.get(), fontWeight: 'black' }}>
								{data.item.displayName}
							</Text>

							<View sx={{ gap: 'lg' }}>
								{_.uniqBy(data.item.phoneNumbers, 'number').map(
									(phoneNumber) => (
										<View
											key={phoneNumber.number}
											sx={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}
										>
											<Text
												sx={{
													fontSize: app$.font.get(),
													fontWeight: 'bold',
												}}
											>
												{phoneNumber.number}
											</Text>

											<Button
												rightIcon='CallOutlineIcon'
												iconSx={{
													width: app$.font.get(),
													height: app$.font.get(),
												}}
												onPress={() => {
													RNImmediatePhoneCall.immediatePhoneCall(
														phoneNumber.number,
													);
												}}
											/>
										</View>
									),
								)}
							</View>
						</View>
					</TouchableOpacity>
				)}
				onRefresh={() => {
					getData();
				}}
			/>

			<Button
				rightIcon='CloseOutlineIcon'
				schema='black'
				sx={{
					position: 'absolute',
					bottom: 12,
					right: 12,
					zIndex: 999,
				}}
				iconSx={{
					width: app$.font.get(),
					height: app$.font.get(),
					transform: [
						{
							rotate: '45deg',
						},
					],
				}}
				onPress={() => {
					navigation.navigate('DetailScreen', { contact: undefined });
				}}
			/>
		</Screen>
	);
});

export { HomeScreen };
