import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type TabStackParamsList = {
	MainTab: {
		screen: 'home' | 'search';
	};
};

type HomeTabStackParamsList = {
	HomeScreen: undefined;
};

type SearchTabStackParamsList = {
	SearchScreen: undefined;
};

type AppStackParamsList = TabStackParamsList;

type RouteStackParamsList = AppStackParamsList;

type ScreenProps<T extends keyof RouteStackParamsList> = NativeStackScreenProps<
	RouteStackParamsList,
	T
>;

export type { RouteStackParamsList, AppStackParamsList, ScreenProps };
export type { HomeTabStackParamsList, SearchTabStackParamsList };
