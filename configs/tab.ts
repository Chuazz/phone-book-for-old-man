import { HomeScreen } from '@/screens/home';
import type { HomeTabStackParamsList, KeyValueType } from '@/types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { FC } from 'react';

const homeTabRoutes: KeyValueType<
	keyof HomeTabStackParamsList,
	{
		options?: NativeStackNavigationOptions;
		component: FC<any>;
	}
> = {
	HomeScreen: {
		component: HomeScreen,
	},
};

export { homeTabRoutes };
