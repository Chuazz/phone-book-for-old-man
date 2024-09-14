import type { BottomSheetStackParamsList } from '@/types';
import { observer } from '@legendapp/state/react';
import { ScrollView, Text, View } from 'dripsy';
import { StyleSheet } from 'react-native';
import { Button } from '../form/button';
import { CheckBox } from '../form/checkbox';
import { Image } from '../ui/image';
import { i18n, SUPPORT_LANGUAGES } from '@/configs/i18n';
import { app$ } from '@/stores';

const SelectLanguage = observer(
	({ closeSheet }: BottomSheetStackParamsList['SelectLanguage']) => {
		return (
			<>
				<Image
					source='BackgroundGradientImage'
					sx={{
						width: 'full',
						height: 'full',
						...StyleSheet.absoluteFillObject,
					}}
				/>

				<View sx={{ pb: 'md' }}>
					<View
						sx={{
							gap: 'sm',
							px: 'md',
							pb: 'lg',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Text
							sx={{
								fontSize: 'xl',
								fontWeight: 'bold',
								flex: 1,
							}}
						>
							{i18n.t('common.select_your_language')}
						</Text>

						<Button
							variant='transparent'
							onPress={() => {
								closeSheet?.();
							}}
						>
							<Image
								source='CloseOutlineIcon'
								sx={{
									width: 'icon-lg',
									height: 'icon-lg',
								}}
							/>
						</Button>
					</View>

					<ScrollView>
						<View
							sx={{
								borderRadius: 'md',
								mx: 'md',
								px: 'lg',
								mb: 12,
								backgroundColor: 'white',
								elevation: 2,
							}}
						>
							{SUPPORT_LANGUAGES.map((item) => (
								<View
									key={item.code}
									sx={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
										py: 'md',
									}}
								>
									<Text
										sx={{
											color: 'black',
											fontWeight: 'medium',
											fontSize: 'lg',
										}}
									>
										{item.label}
									</Text>

									<CheckBox
										data={item}
										value={app$.locale.get()}
										onChange={async () => {
											app$.locale.set(item.code);
										}}
									/>
								</View>
							))}
						</View>
					</ScrollView>
				</View>
			</>
		);
	},
);

export { SelectLanguage };
