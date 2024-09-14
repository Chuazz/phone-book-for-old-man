import { observer } from '@legendapp/state/react';
import { SheetItem } from './sheet-item';
import { bottomSheet$ } from '@/stores/bottom-sheet';

const AppBottomSheet = observer(() => {
	return bottomSheet$.sheets.map((sheet, index) => (
		<SheetItem
			key={sheet.name.get().toString()}
			data={sheet.get()}
			index={index}
		/>
	));
});

export { AppBottomSheet };
