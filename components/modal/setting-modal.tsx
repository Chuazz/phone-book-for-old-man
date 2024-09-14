import { i18n } from '@/configs/i18n';
import { SCREEN_WIDTH } from '@/configs/theme';
import { app$ } from '@/stores';
import Slider from '@react-native-community/slider';
import { Text, View } from 'dripsy';
import { TouchableOpacity } from 'react-native';
import type { ModalProps } from 'react-native-modalfy';

const SettingModal = ({
	modal: { closeModal },
}: ModalProps<'SettingModal'>) => {
	return (
		<View
			sx={{
				padding: 'lg',
				backgroundColor: 'white',
				borderRadius: 'lg',
				width: SCREEN_WIDTH - 24,
			}}
		>
			<TouchableOpacity onPress={() => closeModal()}>
				<View
					sx={{
						backgroundColor: 'primary800',
						borderRadius: 'full',
						justifyContent: 'center',
						alignItems: 'center',
						alignSelf: 'flex-end',
						paddingVertical: 12,
						paddingHorizontal: 24,
					}}
				>
					<Text
						sx={{
							fontSize: app$.font.get(),
							color: 'white',
						}}
					>
						{i18n.t('common.close')}
					</Text>
				</View>
			</TouchableOpacity>

			<Slider
				style={{ width: SCREEN_WIDTH - 48, height: 40 }}
				minimumValue={16}
				maximumValue={40}
				minimumTrackTintColor='#FFFFFF'
				maximumTrackTintColor='#000000'
			/>
		</View>
	);
};

export { SettingModal };
