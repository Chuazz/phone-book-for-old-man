import { Button } from '@/components/form/button';
import { i18n } from '@/configs/i18n';
import type { LibraryType } from '@/hooks/use-media-library';
import { Text, View } from 'dripsy';
import type { ReactNode } from 'react';

const AlbumDetail = ({
	asset,
	children,
	onCancel,
	onDone,
}: {
	asset?: LibraryType;
	children: ReactNode;
	onCancel: () => void;
	onDone: () => void;
}) => {
	return (
		<>
			<View
				sx={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					mb: 'lg',
				}}
			>
				<Button
					leftIcon='ArrowLeftOutlineIcon'
					schema='black'
					variant='transparent'
					sx={{
						width: 40,
					}}
					onPress={onCancel}
				/>

				<Text
					sx={{
						fontSize: 'lg',
						fontWeight: 'bold',
					}}
				>
					{asset?.album?.title}
				</Text>

				<Button
					content={i18n.t('common.done')}
					schema='black'
					variant='transparent'
					sx={{
						width: 40,
					}}
					onPress={onDone}
				/>
			</View>

			{children}
		</>
	);
};

export { AlbumDetail };
