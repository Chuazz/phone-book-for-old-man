import { MediaPicker } from '@/components/bottom-sheet/media-picker';
import { SelectLanguage } from '@/components/bottom-sheet/select-language';
import type { BottomSheetStackParamsList, KeyValueType } from '@/types';
import type { ElementType } from 'react';

const bottomSheet: KeyValueType<keyof BottomSheetStackParamsList, ElementType> =
	{
		SelectLanguage,
		MediaPicker,
	};

export { bottomSheet };
