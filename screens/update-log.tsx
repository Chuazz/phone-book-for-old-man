import { Button } from '@/components/form/button';
import { LoadingOverlay } from '@/components/layout/loading-overlay';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { app$ } from '@/stores';
import type { ScreenProps } from '@/types';
import { observer, useObservable } from '@legendapp/state/react';
import { ScrollView, Text, View } from 'dripsy';
import { checkForUpdateAsync, fetchUpdateAsync } from 'expo-updates';
import { Fragment } from 'react/jsx-runtime';

const UpdateLogScreen = observer(
	({ route, navigation }: ScreenProps<'UpdateLogScreen'>) => {
		const { updates } = route.params;
		const update$ = useObservable<string[]>(updates);
		const loading$ = useObservable<boolean>(false);

		const onUpdate = async () => {
			update$.set([]);
			loading$.set(true);

			try {
				update$.push('Checking for updates...');

				const upd = await checkForUpdateAsync();

				update$.push(
					`update Available? ${upd.isAvailable} - ${JSON.stringify(upd, null, 2)}`,
				);

				if (upd.isAvailable) {
					update$.push('About to Fetch... ');

					const fetched = await fetchUpdateAsync();

					update$.push(
						`Update fetched? ${fetched.isNew} - ${JSON.stringify(fetched, null, 2)}`,
					);
				}

				navigation.navigate('UpdateLogScreen', {
					updates: update$.get(),
				});

				loading$.set(false);
				update$.set([]);
			} catch (e) {
				update$.push(`Error: ${JSON.stringify(e, null, 2)}`);

				navigation.navigate('UpdateLogScreen', {
					updates: update$.get(),
				});

				loading$.set(false);
				update$.set([]);
			}
		};

		return (
			<Screen>
				{loading$.get() && <LoadingOverlay text='Getting your update' />}

				<ScreenHeader />

				<ScrollView contentContainerSx={{ padding: 'md', paddingBottom: 50 }}>
					{update$.get().map((t) => (
						<Fragment key={t}>
							<Text>{t}</Text>

							<View sx={{ height: 2, backgroundColor: 'gray400', my: 'lg' }} />
						</Fragment>
					))}
				</ScrollView>

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
				</View>
			</Screen>
		);
	},
);

export { UpdateLogScreen };
