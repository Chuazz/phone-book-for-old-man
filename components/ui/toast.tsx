import { SCREEN_WIDTH } from '@/configs/theme';
import { toast$ } from '@/stores';
import { Show, observer, useObserve } from '@legendapp/state/react';
import { Text, useSx } from 'dripsy';
import { useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	ReduceMotion,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withTiming,
} from 'react-native-reanimated';

const Toast = observer(() => {
	const sxProps = useSx();
	const opacity = useSharedValue(0);
	const translateX = useSharedValue(-SCREEN_WIDTH);

	const panGesture = useMemo(
		() =>
			Gesture.Tap()
				.onStart(() => {
					translateX.value = withTiming(SCREEN_WIDTH);

					opacity.value = withTiming(0);
				})
				.onEnd(() => {
					setTimeout(() => {
						translateX.value = withTiming(-SCREEN_WIDTH);
						toast$.close();
					}, 300);
				})
				.runOnJS(true),
		[opacity, translateX],
	);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [
			{
				translateX: translateX.value,
			},
		],
	}));

	useObserve(toast$.current, (target) => {
		if (!target.value) {
			return;
		}

		translateX.value = withSequence(
			withTiming(0),
			withDelay(3000, withTiming(SCREEN_WIDTH)),
			withTiming(-SCREEN_WIDTH, {
				reduceMotion: ReduceMotion.Always,
			}),
		);

		opacity.value = withSequence(
			withTiming(1),
			withDelay(3000, withTiming(0)),
			withTiming(0, {
				reduceMotion: ReduceMotion.Always,
			}),
		);

		const id = setTimeout(() => {
			toast$.close();
		}, 4000);

		target.onCleanup = () => clearTimeout(id);
	});

	return (
		<Show if={toast$.current}>
			<GestureDetector gesture={panGesture}>
				<Animated.View
					style={[
						sxProps({
							gap: 'sm',
							position: 'absolute',
							bottom: 24,
							left: 12,
							right: 12,
							padding: 'md',
							borderRadius: 'md',
							backgroundColor: 'gray950',
							zIndex: 999,
						}),
						animatedStyle,
					]}
				>
					<Show if={toast$.current.label}>
						<Text
							sx={{
								color: 'white',
								fontWeight: 'bold',
								lineHeight: 20,
							}}
						>
							{toast$.current.label.get()}
						</Text>
					</Show>

					<Show if={toast$.current.subLabel}>
						<Text
							sx={{
								color: 'white',
								fontWeight: 'medium',
								lineHeight: 20,
							}}
						>
							{toast$.current.subLabel.get()}
						</Text>
					</Show>
				</Animated.View>
			</GestureDetector>
		</Show>
	);
});

export { Toast };
