import { font } from '@/assets';
import { app$ } from '@/stores';
import { when } from '@legendapp/state';
import { enableReactTracking } from '@legendapp/state/config/enableReactTracking';
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import { observer, useObservable } from '@legendapp/state/react';
import { configureObservableSync, syncObservable } from '@legendapp/state/sync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { type ReactNode, useEffect } from 'react';

preventAutoHideAsync();

configureObservableSync({
	persist: {
		plugin: ObservablePersistAsyncStorage,
		asyncStorage: { AsyncStorage },
	},
});

enableReactTracking({
	warnUnobserved: true,
});

const SplashScreen = observer(({ children }: { children: ReactNode }) => {
	const loading$ = useObservable(false);

	const [loaded] = useFonts({
		PublicSans: font.PublicSans,
		'PublicSans-Medium': font.PublicSansMedium,
		'PublicSans-SemiBold': font.PublicSansSemiBold,
		'PublicSans-Bold': font.PublicSansBold,
		'PublicSans-ExtraBold': font.PublicSansExtraBold,
		'PublicSans-Black': font.PublicSansBlack,
	});

	useEffect(() => {
		const handleLoad = async () => {
			if (loaded) {
				await when(
					syncObservable(app$, {
						persist: {
							name: 'app',
						},
					}).isLoaded,
				);

				await hideAsync();

				loading$.set(true && loaded);
			}
		};

		handleLoad();
	}, [loaded, loading$.set]);

	if (!loading$.get()) {
		return null;
	}

	return children;
});

export { SplashScreen };
