import { MainTabNavigation } from '@/components/navigation/main-tab-navigation';
import type { KeyValueType, AppStackParamsList } from '@/types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { FC } from 'react';

const appRoutes: KeyValueType<
	keyof AppStackParamsList,
	{
		options?: NativeStackNavigationOptions;
		component: FC<any>;
	}
> = {
	MainTab: {
		component: MainTabNavigation,
	},
};

const routes = {
	...appRoutes,
};

export { appRoutes, routes };
