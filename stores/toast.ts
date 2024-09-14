import type { OptionType } from '@/types';
import { observable } from '@legendapp/state';

type ToastType = {
	current: Omit<OptionType, 'code'> | undefined;

	show: (_item: Omit<OptionType, 'code'>) => void;

	close: () => void;
};

const toast$ = observable<ToastType>({
	current: undefined,

	show(item) {
		toast$.current.set(item);
	},

	close() {
		toast$.current.set(undefined);
	},
});

export { toast$ };
