import { SettingModal } from '@/components/modal/setting-modal';
import type { KeyValueType } from '@/types';
import type { ModalOptions } from 'react-native-modalfy';

type ModalStackParamsList = {
	SettingModal: undefined;
};

const defaultOptions: ModalOptions = {
	backdropOpacity: 0.4,
	backBehavior: 'clear',
	disableFlingGesture: true,
};

const modal: KeyValueType<keyof ModalStackParamsList, ModalOptions> = {
	SettingModal: {
		modal: SettingModal,
	},
};

export { defaultOptions, modal };
export type { ModalStackParamsList };
