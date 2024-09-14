import { defaultOptions, modal } from '@/configs/modal';
import type { ReactNode } from 'react';
import {
	ModalProvider as RNModalProvider,
	createModalStack,
} from 'react-native-modalfy';

const stack = createModalStack(modal, defaultOptions);

const ModalProvider = ({ children }: { children: ReactNode }) => (
	<RNModalProvider stack={stack}>{children}</RNModalProvider>
);

export { ModalProvider };
