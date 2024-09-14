import { bottomSheet } from '@/configs/bottom-sheet';
import type { BottomSheetStackParamsList } from '@/types';
import { observable } from '@legendapp/state';
import type { ElementType, ReactNode } from 'react';

export type SheetItemType = {
	name: keyof BottomSheetStackParamsList;
	content: ReactNode | undefined;
	visible: boolean;
};

export type OpenSheetProps<
	TName extends
		keyof BottomSheetStackParamsList = keyof BottomSheetStackParamsList,
> = {
	name: TName;
	params?: Omit<BottomSheetStackParamsList[TName], 'closeSheet' | 'openSheet'>;
};

export type BottomSheetType = {
	sheets: SheetItemType[];

	visible: boolean;

	openSheet: <TName extends keyof BottomSheetStackParamsList>(
		_props: OpenSheetProps<TName>,
	) => void;

	closeSheet: (_name?: keyof BottomSheetStackParamsList) => void;
};

const bottomSheet$ = observable<BottomSheetType>({
	sheets: [],

	openSheet({ name, params }) {
		const Component = bottomSheet[name] as ElementType;

		bottomSheet$.sheets[bottomSheet$.sheets.length]?.set({
			name,
			visible: true,
			content: (
				<Component
					{...params}
					openSheet={({
						name: sheetName,
						params: sheetParams,
					}: OpenSheetProps) => {
						bottomSheet$.openSheet({
							name: sheetName,
							params: sheetParams,
						});
					}}
					closeSheet={() => {
						bottomSheet$.closeSheet(name);
					}}
				/>
			),
		});
	},

	closeSheet(name) {
		if (!bottomSheet$.sheets.length) {
			return;
		}

		if (!name) {
			bottomSheet$.sheets[bottomSheet$.sheets.length - 1]?.visible.set(false);

			return;
		}

		const index = bottomSheet$.sheets.findIndex((t) => t.name.get() === name);

		bottomSheet$.sheets[index]?.visible.set(false);
	},

	visible() {
		const found = bottomSheet$.sheets.get().find((t) => t.visible);

		if (found) {
			return true;
		}

		return false;
	},
});

export { bottomSheet$ };
