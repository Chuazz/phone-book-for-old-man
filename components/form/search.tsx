import { TextInput, View, useDripsyTheme } from 'dripsy';
import { Image } from '../ui/image';
import { i18n } from '@/configs/i18n';
import { app$ } from '@/stores';
import { observer } from '@legendapp/state/react';

type SearchProps = {
	onChange: (_value: string) => void;
};

const Search = observer(({ onChange }: SearchProps) => {
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
				width: 'full',
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

			<TextInput
				placeholder={i18n.t('common.search')}
				placeholderTextColor={theme.colors.gray600}
				sx={{
					flex: 1,
					paddingVertical: 'sm',
					fontSize: app$.font.get(),
				}}
				onChangeText={onChange}
			/>
		</View>
	);
});

export { Search };
