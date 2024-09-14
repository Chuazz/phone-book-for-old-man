import { Search } from '@/components/form/search';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { Image } from '@/components/ui/image';
import { app$ } from '@/stores';
import type { ScreenProps } from '@/types';
import { observer, useObservable } from '@legendapp/state/react';
import { Text, View } from 'dripsy';
import { useCallback, useEffect } from 'react';
import { FlatList, PermissionsAndroid, TouchableOpacity } from 'react-native';
import Contacts, { type Contact } from 'react-native-contacts';

const HomeScreen = observer(({ navigation }: ScreenProps<'MainTab'>) => {
	const contacts$ = useObservable<Contact[]>([]);
	const loading$ = useObservable<boolean>(false);

	const getData = useCallback(async () => {
		loading$.set(true);

		const result = await Contacts.getAll();

		loading$.set(false);

		contacts$.set([
			...result,
			...result,
			...result,
			...result,
			...result,
			...result,
			...result,
			...result,
		]);
	}, [contacts$.set, loading$.set]);

	const checkPermission = useCallback(async () => {
		const granted = await PermissionsAndroid.request(
			'android.permission.READ_CONTACTS',
			{
				title: 'Contacts',
				message: 'This app would like to view your contacts.',
				buttonPositive: 'Please accept bare mortal',
			},
		);

		if (granted === 'denied') {
			return;
		}

		getData();
	}, [getData]);

	useEffect(() => {
		checkPermission();
	}, [checkPermission]);

	return (
		<Screen navigation={navigation}>
			<FlatList
				refreshing={false}
				data={contacts$.get()}
				contentContainerStyle={{ paddingBottom: 24 }}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<ScreenHeader sx={{ backgroundColor: 'white', paddingVertical: 12 }}>
						<Search />
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
					<TouchableOpacity>
						<View
							sx={{
								flexDirection: 'row',
								alignItems: 'center',
								gap: 'lg',
								px: 'md',
							}}
						>
							<View sx={{ flex: 1 }}>
								<Text style={{ fontSize: app$.font.get(), fontWeight: '900' }}>
									{data.item.displayName}
								</Text>
								<Text style={{ fontSize: app$.font.get(), fontWeight: '900' }}>
									{data.item.phoneNumbers.map((t) => t.number)}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				)}
				onRefresh={() => {
					getData();
				}}
			/>
		</Screen>
	);
});

export { HomeScreen };
