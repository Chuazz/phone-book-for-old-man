import { Button } from '@/components/form/button';
import { i18n } from '@/configs/i18n';
import { Text, View } from 'dripsy';
import type { ReactNode } from 'react';

const AlbumList = ({
	onCancel,
	children,
}: {
	onCancel: () => void;
	children: ReactNode;
}) => {
	return (
		<>
			<View
				sx={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Button
					leftIcon='ArrowLeftOutlineIcon'
					schema='black'
					variant='transparent'
					onPress={onCancel}
				/>

				<Text
					sx={{
						fontWeight: 'bold',
						fontSize: 'lg',
					}}
				>
					{i18n.t('common.select_album')}
				</Text>

				<Text
					sx={{
						color: 'transparent',
						fontWeight: 'medium',
						fontSize: 'lg',
					}}
				>
					{i18n.t('common.cancel')}
				</Text>
			</View>

			<View sx={{ gap: 'xs', my: 'xl' }}>
				<Button
					leftIcon='PictureIcon'
					schema='gray'
				/>

				<Text
					sx={{
						fontWeight: 'semibold',
					}}
				>
					{i18n.t('common.recently')}
				</Text>
			</View>

			<View
				sx={{
					gap: 'md',
				}}
			>
				<View
					sx={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Text
						sx={{
							fontSize: 'lg',
							fontWeight: 'semibold',
							color: 'gray600',
						}}
					>
						{i18n.t('common.album')}
					</Text>
				</View>

				{children}
			</View>
		</>
	);
};

export { AlbumList };
