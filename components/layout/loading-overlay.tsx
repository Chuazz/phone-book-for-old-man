import { ActivityIndicator, Text, View } from 'dripsy';
import { StyleSheet } from 'react-native';

const LoadingOverlay = ({ text = 'Loading' }: { text?: string }) => {
	return (
		<View
			sx={{
				...StyleSheet.absoluteFillObject,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'blackAlpha400',
				zIndex: 9999,
			}}
		>
			<View
				sx={{
					alignItems: 'center',
					gap: 'sm',
					px: 'md',
					justifyContent: 'center',
				}}
			>
				<ActivityIndicator
					color='white'
					size='large'
				/>

				<Text sx={{ color: 'white', fontSize: 'lg' }}>{text}</Text>
			</View>
		</View>
	);
};

export { LoadingOverlay };
