import 'react-native-modalfy';
import type { ModalStackParamsList } from './configs/modal';

declare module 'react-native-modalfy' {
	interface ModalfyCustomParams extends ModalStackParamsList {}
}
