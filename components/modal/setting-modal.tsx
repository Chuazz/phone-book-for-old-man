import { i18n } from '@/configs/i18n';
import { SCREEN_WIDTH } from '@/configs/theme';
import { app$ } from '@/stores';
import { observer } from '@legendapp/state/react';
import Slider from '@react-native-community/slider';
import { Text, View } from 'dripsy';
import { TouchableOpacity } from 'react-native';
import type { ModalProps } from 'react-native-modalfy';

const MIN = 16;
const MAX = 46;

const SettingModal = observer(
	({ modal: { closeModal } }: ModalProps<'SettingModal'>) => {
		return (
			<View
				sx={{
					padding: 'lg',
					backgroundColor: 'white',
					borderRadius: 'lg',
					width: SCREEN_WIDTH - 24,
					gap: 'xl',
				}}
			>
				<Text
					sx={{
						fontSize: app$.font.get(),
					}}
				>
					{i18n.t('common.font')}: {app$.font.get()}
				</Text>

				<View>
					<Slider
						style={{ width: SCREEN_WIDTH - 48, height: 40 }}
						minimumValue={MIN}
						maximumValue={MAX}
						maximumTrackTintColor='#000000'
						value={app$.font.get()}
						onValueChange={(e) => app$.font.set(Math.ceil(e))}
					/>

					<View
						sx={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text sx={{ fontSize: app$.font.get() }}>{MIN}</Text>
						<Text sx={{ fontSize: app$.font.get() }}>{MAX}</Text>
					</View>
				</View>

				<TouchableOpacity onPress={() => closeModal('SettingModal')}>
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
			</View>
		);
	},
);

export { SettingModal };
