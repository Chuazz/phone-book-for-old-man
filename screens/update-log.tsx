import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import type { ScreenProps } from '@/types';
import { ScrollView, Text, View } from 'dripsy';
import { Fragment } from 'react/jsx-runtime';

const UpdateLogScreen = ({ route }: ScreenProps<'UpdateLogScreen'>) => {
	const { updates } = route.params;

	return (
		<Screen>
			<ScreenHeader />

			<ScrollView contentContainerSx={{ padding: 'md', paddingBottom: 50 }}>
				{updates.map((t) => (
					<Fragment key={t}>
						<Text>{t}</Text>

						<View sx={{ height: 2, backgroundColor: 'gray400', my: 'lg' }} />
					</Fragment>
				))}
			</ScrollView>
		</Screen>
	);
};

export { UpdateLogScreen };
