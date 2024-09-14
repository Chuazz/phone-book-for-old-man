import { Show } from '@legendapp/state/react';
import { useNavigation } from '@react-navigation/native';
import { type SxProp, Text, View } from 'dripsy';
import type { ReactNode } from 'react';
import { Button } from '../form/button';
import { HEADER_HEIGHT } from '@/configs/theme';

type ScreenHeaderProps = {
	children?: ReactNode;
	sx?: SxProp;
	content?: string;
	canGoBack?: boolean;
};

const ScreenHeader = ({
	children,
	sx,
	content,
	canGoBack = true,
}: ScreenHeaderProps) => {
	const navigation = useNavigation();

	return (
		<View
			sx={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 'md',
				paddingHorizontal: 'md',
				minHeight: HEADER_HEIGHT,
				...sx,
			}}
		>
			<Show
				if={children}
				else={
					<>
						{canGoBack && (
							<Button
								variant='transparent'
								schema='black'
								leftIcon='ArrowLeftOutlineIcon'
								onPress={() => {
									navigation.goBack();
								}}
							/>
						)}

						<Text
							numberOfLines={1}
							sx={{
								flex: 1,
								fontWeight: 'semibold',
								fontSize: 'lg',
								textAlign: 'center',
							}}
						>
							{content}
						</Text>

						<View
							sx={{
								width: 'icon-md',
								height: 'full',
							}}
						/>
					</>
				}
			>
				{children}
			</Show>
		</View>
	);
};

export { ScreenHeader };
