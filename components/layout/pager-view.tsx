import { SCREEN_WIDTH } from '@/configs/theme';
import type { Observable } from '@legendapp/state';
import { observer, useEffectOnce, useObservable } from '@legendapp/state/react';
import { ScrollView, type SxProp } from 'dripsy';
import {
	type ReactNode,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from 'react';
import type { ScrollView as RNScrollView } from 'react-native';

type PagerViewProps = {
	children: ReactNode;
	itemWidth?: number;
	sx?: SxProp;
	initial?: number;
};

type PagerViewRef = {
	scrollTo: (_index: number) => void;
	index$: Observable<number>;
};

const PagerView = observer(
	forwardRef<PagerViewRef, PagerViewProps>(
		({ children, sx, itemWidth = SCREEN_WIDTH, initial = 0 }, ref) => {
			const scrollRef = useRef<RNScrollView>(null);
			const index$ = useObservable(initial);

			const scrollTo = useCallback(
				(index: number) => {
					scrollRef.current?.scrollTo({
						x: index * itemWidth,
					});

					index$.set(index);
				},
				[index$.set, itemWidth],
			);

			useEffectOnce(() => {
				scrollTo(initial);
			}, []);

			useImperativeHandle(ref, () => ({
				scrollTo,
				index$,
			}));

			return (
				<ScrollView
					ref={scrollRef}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					scrollEnabled={false}
					contentContainerSx={{
						flexGrow: 1,
						...sx,
					}}
				>
					{children}
				</ScrollView>
			);
		},
	),
);

export { PagerView };
export type { PagerViewRef };
