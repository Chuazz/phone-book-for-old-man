import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import type { ScreenProps } from '@/types/routes';

const SearchScreen = ({ navigation }: ScreenProps<'MainTab'>) => {
	return (
		<Screen navigation={navigation}>
			<ScreenHeader />
		</Screen>
	);
};

export { SearchScreen };
