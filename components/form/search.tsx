import { i18n } from '@/configs/i18n';
import { app$ } from '@/stores';
import { observer } from '@legendapp/state/react';
import { View, useDripsyTheme } from 'dripsy';
import { Image } from '../ui/image';
import { Input } from './input';

type SearchProps = {
	value?: string;
	onChange: (_value: string) => void;
};

const Search = observer(({ value, onChange }: SearchProps) => {
	const { theme } = useDripsyTheme();

	return (
		<View
			sx={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 'md',
				paddingHorizontal: 'lg',
				borderRadius: 'sm',
				backgroundColor: 'gray100',
				flex: 1,
			}}
		>
			<Image
				source='SearchOutlineIcon'
				sx={{
					width: app$.font.get(),
					height: app$.font.get(),
					tintColor: theme.colors.gray600,
				}}
			/>

			<Input
				value={value}
				sx={{
					paddingVertical: 'sm',
					fontSize: app$.font.get(),
				}}
				containerSx={{
					flex: 1,
					backgroundColor: 'transparent',
					borderWidth: 0,
				}}
				onChangeText={onChange}
			/>
		</View>
	);
});

export { Search };
