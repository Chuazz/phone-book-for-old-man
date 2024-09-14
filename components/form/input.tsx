import { AntDesign } from '@expo/vector-icons';
import { Show, observer, useObservable } from '@legendapp/state/react';
import { Text, TextInput, View, useDripsyTheme } from 'dripsy';
import type { DripsyTextInputProps } from 'dripsy/build/core/components/TextInput';
import { useRef } from 'react';
import type {
	NativeSyntheticEvent,
	TextInput as RNTextInput,
	TextInputFocusEventData,
} from 'react-native';
import { Button } from '../form/button';
import type { image } from '@/assets';
import { INPUT_HEIGHT } from '@/configs/theme';

type InputProps = DripsyTextInputProps & {
	errMessage?: string;
	allowClear?: boolean;
	type?: 'string' | 'password';
};

const Input = observer(
	({ errMessage, type = 'string', allowClear, ...props }: InputProps) => {
		const focus$ = useObservable(props.autoFocus || !!props.value);
		const blur$ = useObservable(true);
		const hideInput$ = useObservable(true);
		const { theme } = useDripsyTheme();
		const ref = useRef<RNTextInput>(null);
		const errColor = theme.colors.red700;

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
			if (type === 'password') {
				if (hideInput$.get()) {
					return 'EyeIcon';
				}

				return 'EyeSlashIcon';
			}

			return 'CloseOutlineIcon';
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
			props.onChangeText?.(text);
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
			<View sx={{ gap: 'xs' }}>
				<View
					sx={{
						borderColor,
						height: INPUT_HEIGHT,
						borderRadius: 'md',
						backgroundColor: 'white',
						borderWidth: 1,
						paddingHorizontal: 16,
						justifyContent: 'center',
					}}
				>
					<Show if={() => focus$.get() && props.placeholder}>
						<Text
							sx={{
								fontSize: 'sm',
								fontWeight: 'semibold',
								color: errMessage && !focus$.get() ? errColor : 'primary950',
							}}
						>
							{props.placeholder}
						</Text>
					</Show>

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
							sx={{
								position: 'absolute',
								right: -8,
								top: -35,
							}}
							iconSx={{
								tintColor: theme.colors.gray500,
							}}
							onPress={onPressRightIcon}
						/>
					</Show>

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
