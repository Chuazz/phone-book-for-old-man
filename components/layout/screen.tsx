import { bottomSheet$ } from '@/stores/bottom-sheet';
import { observer, useEffectOnce } from '@legendapp/state/react';
import type { NavigationProp } from '@react-navigation/native';
import { type SxProp, View } from 'dripsy';
import { type ReactNode, useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from '../ui/image';
import type { RouteStackParamsList } from '@/types/routes';
import type { image } from '@/assets';

type ScreenProps = {
	children: ReactNode;
	sx?: SxProp;
	backgroundImage?: keyof typeof image;
	navigation: NavigationProp<RouteStackParamsList>;
};

const Screen = observer(
	({ children, sx, backgroundImage, navigation }: ScreenProps) => {
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
			</View>
		);
	},
);

export { Screen };
