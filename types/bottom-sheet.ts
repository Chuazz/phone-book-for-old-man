import { OpenSheetProps } from '@/stores/bottom-sheet';
import type { OptionType } from '@instagram/types';
import type { Asset } from 'expo-media-library';

type BottomSheetStackParamsList = {
	SelectLanguage: BaseBottomSheetProps<Record<string, string>>;
	MediaPicker: BaseBottomSheetProps<{
		multiple?: boolean;
		moreOptions?: OptionType[];
		onSelect: (_items: Asset[]) => void;
	}>;
};

type BaseBottomSheetProps<T> = T & {
	closeSheet: () => void;
	openSheet: <TName extends keyof BottomSheetStackParamsList>(
		_props: OpenSheetProps<TName>,
	) => void;
};

export type { BaseBottomSheetProps, BottomSheetStackParamsList };
