import { ActivityIndicator, View } from 'dripsy';
import { StyleSheet, Text } from 'react-native';

const LoadingOverlay = ({ text = 'Loading' }: { text?: string }) => {
	return (
		<View
			sx={{
				...StyleSheet.absoluteFillObject,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'blackAlpha300',
				zIndex: 9999,
			}}
		>
			<View
				sx={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 'sm',
				}}
			>
				<ActivityIndicator
					color='primary700'
					size='large'
				/>

				<Text>{text}</Text>
			</View>
		</View>
	);
};

export { LoadingOverlay };
