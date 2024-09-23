import type { image } from '@/assets';
import { bottomSheet$ } from '@/stores/bottom-sheet';
import type { RouteStackParamsList } from '@/types/routes';
import { observer, useEffectOnce } from '@legendapp/state/react';
import type { NavigationProp } from '@react-navigation/native';
import { type SxProp, Text, View } from 'dripsy';
import { runtimeVersion } from 'expo-updates';
import { type ReactNode, useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from '../ui/image';
import { LoadingOverlay } from './loading-overlay';

type ScreenProps = {
	children: ReactNode;
	sx?: SxProp;
	loading?: boolean;
	backgroundImage?: keyof typeof image;
	navigation?: NavigationProp<RouteStackParamsList>;
};

const Screen = observer(
	({ children, sx, backgroundImage, loading, navigation }: ScreenProps) => {
		const insets = useSafeAreaInsets();

		useEffect(() => {
			if (!navigation) {
				return;
			}

			const unsubscribe = navigation.addListener('beforeRemove', (e) => {
				if (bottomSheet$.visible.get()) {
					bottomSheet$.closeSheet();

					e.preventDefault();
				}
			});

			return unsubscribe;
		}, [navigation]);

		useEffectOnce(() => {
			BackHandler.addEventListener('hardwareBackPress', () => {
				if (bottomSheet$.visible.get()) {
					bottomSheet$.closeSheet();

					return true;
				}
				return false;
			});
		}, []);

		return (
			<View
				sx={{
					backgroundColor: 'white',
					marginTop: insets.top,
					flexGrow: 1,
					width: 'screen-width',
					...sx,
				}}
			>
				{loading && <LoadingOverlay />}

				{backgroundImage && (
					<Image
						source={backgroundImage}
						sx={{
							width: 'screen-width',
							height: 'screen-height',
							...StyleSheet.absoluteFillObject,
						}}
					/>
				)}

				{children}

				<View
					sx={{
						position: 'absolute',
						backgroundColor: 'blackAlpha500',
						bottom: 0,
						left: 0,
						paddingVertical: 4,
						paddingHorizontal: 12,
					}}
				>
					<Text sx={{ color: 'white' }}>{runtimeVersion}</Text>
				</View>
			</View>
		);
	},
);

export { Screen };
