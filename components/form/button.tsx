import { Show } from '@legendapp/state/react';
import {
	ActivityIndicator,
	type SxProp,
	Text,
	View,
	useDripsyTheme,
	useSx,
} from 'dripsy';
import { type ReactNode, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from '../ui/image';
import type { image } from '@/assets';

type ButtonProps = {
	content?: string;
	children?: ReactNode;
	sx?: SxProp;
	contentSx?: SxProp;
	iconSx?: SxProp;
	leftIconSx?: SxProp;
	rightIconSx?: SxProp;
	indicatorColor?: string;
	leftIcon?: keyof typeof image;
	rightIcon?: keyof typeof image;
	size?: 'sm' | 'md' | 'lg';
	schema?: 'primary' | 'gray' | 'white' | 'black';
	rounded?: boolean;
	fullWidth?: boolean;
	loading?: boolean;
	disable?: boolean;
	variant?: 'fill' | 'outline' | 'transparent';
	onPress?: () => void;
};

const Button = ({
	children,
	content,
	sx,
	contentSx,
	iconSx,
	leftIconSx,
	rightIconSx,
	indicatorColor,
	loading = false,
	size = 'md',
	rounded = true,
	schema = 'primary',
	variant = 'fill',
	leftIcon,
	rightIcon,
	fullWidth,
	disable,
	onPress,
}: ButtonProps) => {
	const sxProps = useSx();
	const { theme } = useDripsyTheme();
	const primary = useMemo(
		() => theme.colors.primary700,
		[theme.colors.primary700],
	);
	const gray = useMemo(() => theme.colors.gray100, [theme.colors.gray100]);

	const styles = useMemo(() => {
		let indicatorColor = '';

		const button: SxProp = {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 'md',
			paddingVertical: size,
			paddingHorizontal: 'md',
			borderWidth: 2,
			borderColor: 'transparent',
			gap: 'xs',
		};

		const text: SxProp = {
			fontWeight: 'bold',
			fontSize: size,
		};

		if (schema === 'primary') {
			button.backgroundColor = primary;

			text.color = 'white';

			indicatorColor = 'white';

			if (variant === 'outline') {
				button.borderColor = primary;

				text.color = primary;

				indicatorColor = primary;
			}

			if (variant === 'transparent') {
				text.color = primary;

				indicatorColor = primary;
			}
		}

		if (schema === 'gray') {
			button.backgroundColor = gray;

			text.color = 'gray900';

			indicatorColor = gray;

			if (variant === 'outline') {
				button.borderColor = 'gray200';

				text.color = 'gray700';

				indicatorColor = 'gray700';
			}

			if (variant === 'transparent') {
				text.color = 'gray700';

				indicatorColor = 'gray700';
			}
		}

		if (schema === 'white') {
			button.backgroundColor = 'white';
			text.color = 'black';

			if (variant === 'transparent') {
				text.color = 'white';
			}

			if (variant === 'outline') {
				button.borderColor = 'white';
				text.color = 'white';
			}
		}

		if (schema === 'black') {
			if (variant === 'transparent') {
				text.color = 'black';
			}
		}

		if (rounded) {
			button.borderRadius = 'full';
		}

		if (variant === 'outline') {
			button.backgroundColor = 'transparent';
		}

		if (variant === 'transparent') {
			button.backgroundColor = 'transparent';
			button.padding = 0;
			button.paddingVertical = 0;
			button.paddingHorizontal = 0;
			button.borderRadius = size;
		}

		if (disable) {
			button.opacity = 0.5;
		}

		return {
			button,
			text,
			indicatorColor,
		};
	}, [schema, variant, rounded, size, disable, gray, primary]);

	const render = useMemo(() => {
		if (children) {
			return children;
		}

		return (
			<>
				<Show if={leftIcon}>
					<Image
						source={leftIcon}
						sx={{
							width: `icon-${size}`,
							height: `icon-${size}`,
							tintColor: styles.text.color?.toString(),
							...leftIconSx,
							...iconSx,
						}}
					/>
				</Show>

				<Show if={content}>
					<Text
						sx={{
							...styles.text,
							...contentSx,
						}}
					>
						{!loading ? content : ''}
					</Text>
				</Show>

				<Show if={rightIcon}>
					<Image
						source={rightIcon}
						sx={{
							width: `icon-${size}`,
							height: `icon-${size}`,
							tintColor: styles.text.color?.toString(),
							...rightIconSx,
							...iconSx,
						}}
					/>
				</Show>
			</>
		);
	}, [
		loading,
		content,
		leftIcon,
		rightIcon,
		children,
		contentSx,
		iconSx,
		leftIconSx,
		rightIconSx,
		styles,
		size,
	]);

	return (
		<View
			sx={{
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				width: fullWidth ? 'full' : 'auto',
			}}
		>
			<Show if={loading}>
				<View
					sx={{
						...StyleSheet.absoluteFillObject,
						zIndex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<ActivityIndicator color={indicatorColor || styles.indicatorColor} />
				</View>
			</Show>

			<TouchableOpacity
				activeOpacity={0.5}
				disabled={disable}
				style={sxProps({
					width: fullWidth ? 'full' : 'auto',
					opacity: disable ? 0.5 : 1,
					...styles.button,
					...sx,
				})}
				onPress={onPress}
			>
				{render}
			</TouchableOpacity>
		</View>
	);
};

export { Button };
