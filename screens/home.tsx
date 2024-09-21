import { Button } from '@/components/form/button';
import { Search } from '@/components/form/search';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { i18n } from '@/configs/i18n';
import { SCREEN_WIDTH } from '@/configs/theme';
import { app$ } from '@/stores';
import type { ScreenProps } from '@/types';
import { observer, useObservable } from '@legendapp/state/react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View } from 'dripsy';
import _ from 'lodash';
import { useRef } from 'react';
import { FlatList, PermissionsAndroid, TouchableOpacity } from 'react-native';
import Contacts, { type Contact } from 'react-native-contacts';
import { checkForUpdateAsync, fetchUpdateAsync } from 'expo-updates';
import { LoadingOverlay } from '@/components/layout/loading-overlay';

const wait = async (seconds: number) =>
	new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const HomeScreen = observer(({ navigation }: ScreenProps<'HomeScreen'>) => {
	const contacts$ = useObservable<Contact[]>(
		__DEV__
			? [
					{
						displayName: 'hendson',
						phoneNumbers: [{ number: '123213123123', label: 'home' }],
					},
					{
						displayName: 'jaden',
						phoneNumbers: [{ number: '238947823764', label: 'home' }],
					},
				]
			: [],
	);
	const allContacts$ = useObservable<Contact[][]>([]);
	const runOnce = useRef(false);
	const keywords = useObservable('');
	const page$ = useObservable(0);
	const update$ = useObservable('');

	const getData = async () => {
		try {
			const result = (await Contacts.getAll()).filter(
				(t) => t.phoneNumbers.length,
			);

			const limit = 10;

			if (result.length > limit) {
				const page = Math.ceil(result.length / limit);

				for (let index = 0; index < page; index++) {
					allContacts$[index]?.set(result.slice(0, limit));

					result.splice(0, limit);
				}

				if (allContacts$[0]) {
					contacts$.set(allContacts$[0]?.get());
				}

				return;
			}

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

	const onUpdate = async () => {
		try {
			update$.set('Checking for updates...');

			await wait(2);

			const upd = await checkForUpdateAsync();

			update$.set(`update Available? ${upd.isAvailable} - JSON.stringify(upd)`);

			await wait(2);

			if (upd.isAvailable) {
				update$.set('About to Fetch... ');

				await wait(2);

				try {
					const fetched = await fetchUpdateAsync();
					update$.set(
						`Update fetched? ${fetched.isNew} - ${JSON.stringify(fetched)}`,
					);

					await wait(2);

					update$.set('');
				} catch (e) {
					update$.set(`Error fetching update:  + ${e}`);

					await wait(2);

					update$.set('');
				}
			} else {
			}
		} catch (e) {
			update$.set(`Error else:  + ${e}`);

			await wait(2);

			update$.set('');
		}
	};

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
			{update$.get() && <LoadingOverlay text={update$.get()} />}

			<FlatList
				refreshing={false}
				data={contacts$.get()}
				contentContainerStyle={{ paddingBottom: 120 }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
				onEndReached={() => {
					if (page$.get() < allContacts$.length - 1) {
						page$.set((prev) => prev + 1);

						contacts$.set((prev) =>
							prev.concat(allContacts$?.[page$.get()]?.get() || []),
						);
					}
				}}
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
							my: 'md',
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
							<Text sx={{ fontSize: 20, fontWeight: 'black' }}>
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

											{/* <Button
												rightIcon='CallOutlineIcon'
												iconSx={{
													width: app$.font.get(),
													height: app$.font.get(),
												}}
												onPress={() => {
													// RNImmediatePhoneCall.immediatePhoneCall(
													// 	phoneNumber.number,
													// );
												}}
											/> */}
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

			<View
				sx={{
					position: 'absolute',
					bottom: 12,
					right: 12,
					zIndex: 999,
					gap: 'md',
					p: 'md',
					backgroundColor: 'primary500',
					borderRadius: 'full',
				}}
			>
				<Button
					rightIcon='FileCloudIcon'
					schema='black'
					iconSx={{
						width: app$.font.get(),
						height: app$.font.get(),
					}}
					onPress={onUpdate}
				/>
				<Button
					rightIcon='CloseOutlineIcon'
					schema='black'
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
			</View>
		</Screen>
	);
});

export { HomeScreen };
