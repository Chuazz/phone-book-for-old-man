import type { OptionType } from '@/types';
import { Image } from '../ui/image';
import { Button } from './button';

type CheckBoxProps = {
	data: OptionType;
	value: string;
	checkedColor?: string;
	unCheckColor?: string;
	onChange?: () => void;
};

const CheckBox = ({
	data,
	value,
	onChange,
	checkedColor = '#0073ff',
	unCheckColor = '#989898',
}: CheckBoxProps) => {
	return (
		<Button
			variant='transparent'
			onPress={() => {
				onChange?.();
			}}
		>
			<Image
				source={data.code === value ? 'CheckBoxFillIcon' : 'SquareOutlineIcon'}
				sx={{
					size: 'icon-md',
					width: 'icon-md',
					tintColor: data.code === value ? checkedColor : unCheckColor,
				}}
			/>
		</Button>
	);
};

export { CheckBox };
