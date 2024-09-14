import '@/configs/reactotron';
import { ModalProvider } from '@/providers/modal-provider';
import { observer } from '@legendapp/state/react';
import { DripsyProvider, Text } from 'dripsy';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppBottomSheet } from './components/bottom-sheet/app-bottom-sheet/app-bottom-sheet';
import { SplashScreen } from './components/layout/splash-screen';
import { Navigation } from './components/navigation/app-navigation';
import { Toast } from './components/ui/toast';
import { theme } from './configs/theme';
import { trans } from './utils';
import RNShake from 'react-native-shake';
import { useEffect } from 'react';
import { useModal } from 'react-native-modalfy';

const AppContent = () => {
	const { openModal } = useModal();

	useEffect(() => {
		openModal('SettingModal');

		const subscription = RNShake.addListener(() => {
			openModal('SettingModal');
		});

		return () => {
			subscription.remove();
		};
	}, [openModal]);
	return (
		<Navigation>
			<AppBottomSheet />

			<Toast />
		</Navigation>
	);
};

const App = observer(() => {
	return (
		<GestureHandlerRootView>
			<DripsyProvider theme={theme}>
				<SafeAreaProvider>
					<StatusBar style='dark' />

					<SplashScreen>
						<Text
							sx={{
								display: 'none',
							}}
						>
							{trans('')}
						</Text>

						<ModalProvider>
							<AppContent />
						</ModalProvider>
					</SplashScreen>
				</SafeAreaProvider>
			</DripsyProvider>
		</GestureHandlerRootView>
	);
});

export default App;
