import type { image } from '@/assets';
import { app$ } from '@/stores';
import { AntDesign } from '@expo/vector-icons';
import { Show, observer, useObservable } from '@legendapp/state/react';
import { type SxProp, Text, TextInput, View, useDripsyTheme } from 'dripsy';
import type { DripsyTextInputProps } from 'dripsy/build/core/components/TextInput';
import { useRef } from 'react';
import type {
	NativeSyntheticEvent,
	TextInput as RNTextInput,
	TextInputFocusEventData,
} from 'react-native';
import { Button } from '../form/button';

type InputProps = DripsyTextInputProps & {
	errMessage?: string;
	allowClear?: boolean;
	containerSx?: SxProp;
	type?: 'string' | 'password' | 'number';
};

const Input = observer(
	({
		errMessage,
		containerSx,
		type = 'string',
		allowClear,
		...props
	}: InputProps) => {
		const focus$ = useObservable(props.autoFocus || !!props.value);
		const blur$ = useObservable(true);
		const hideInput$ = useObservable(true);
		const { theme } = useDripsyTheme();
		const ref = useRef<RNTextInput>(null);
		const errColor = theme.colors.red700;
		const containerProps: SxProp = { ...containerSx };

		const borderColor = (() => {
			if (focus$.get()) {
				return theme.colors.primary950;
			}

			if (errMessage) {
				return errColor;
			}

			return theme.colors.gray200;
		})();

		const rightIcon: keyof typeof image = (() => {
			// if (type === 'password') {
			// 	if (hideInput$.get()) {
			// 		return 'EyeIcon';
			// 	}

			// 	return 'EyeSlashIcon';
			// }

			return 'CloseOutlineIcon' as keyof typeof image;
		})();

		const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			focus$.set(true);
			blur$.set(false);

			props.onFocus?.(e);
		};

		const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			if (!props.value) {
				focus$.set(false);
			}

			blur$.set(true);

			props.onBlur?.(e);
		};

		const onChangeText = (text: string) => {
			let result = text;

			if (type === 'number') {
				result = result.replace(/\D/g, '');
			}

			props.onChangeText?.(result);
		};

		const onPressRightIcon = () => {
			if (type === 'password') {
				hideInput$.set((prev) => !prev);

				return;
			}

			props.onChangeText?.('');
			ref.current?.focus();
		};

		return (
			<View sx={{ gap: 'xs', flex: containerProps.flex }}>
				<View
					sx={{
						borderColor,
						paddingVertical: 'md',
						borderRadius: 'md',
						backgroundColor: 'white',
						borderWidth: 1,
						paddingHorizontal: 16,
						justifyContent: 'center',
						gap: 'md',
						...containerSx,
					}}
				>
					<Show if={() => focus$.get() && props.placeholder}>
						<Text
							sx={{
								fontSize: app$.font.get(),
								fontWeight: 'semibold',
								color: errMessage && !focus$.get() ? errColor : 'primary950',
							}}
						>
							{props.placeholder}
						</Text>
					</Show>

					<View sx={{ flexDirection: 'row', alignItems: 'center' }}>
						<TextInput
							placeholderTextColor={
								errMessage && props.value ? errColor : theme.colors.gray300
							}
							cursorColor={theme.colors.black}
							secureTextEntry={type === 'password' && hideInput$.get()}
							{...props}
							ref={ref}
							autoCapitalize='none'
							autoComplete='off'
							autoCorrect={false}
							placeholder={focus$.get() ? '' : props.placeholder}
							sx={{
								height: focus$.get() ? 'auto' : 'full',
								paddingVertical: 0,
								paddingRight: 30,
								fontWeight: 'semibold',
								fontSize: app$.font.get(),
								flex: 1,
								...props.sx,
							}}
							onFocus={onFocus}
							onBlur={onBlur}
							onChangeText={onChangeText}
						/>

						<Show
							if={() =>
								(props.value && allowClear && type === 'string') ||
								(props.value && type === 'password') ||
								(props.value && !blur$.get())
							}
						>
							<Button
								variant='transparent'
								rightIcon={rightIcon}
								iconSx={{
									tintColor: theme.colors.gray500,
									width: app$.font.get(),
									height: app$.font.get(),
								}}
								onPress={onPressRightIcon}
							/>
						</Show>
					</View>

					<Show if={() => errMessage && !focus$.get()}>
						<View
							sx={{
								position: 'absolute',
								right: 12,
							}}
						>
							<AntDesign
								name='exclamationcircleo'
								size={24}
								color={errColor}
							/>
						</View>
					</Show>
				</View>

				<Show if={() => !!errMessage}>
					<Text
						sx={{
							color: errColor,
							fontWeight: 'medium',
							fontSize: app$.font.get(),
						}}
					>
						{errMessage}
					</Text>
				</Show>
			</View>
		);
	},
);

export { Input };
