import { appRoutes } from '@/configs/route';
import type { RouteStackParamsList } from '@/types/routes';
import { observer } from '@legendapp/state/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ReactNode } from 'react';

const Stack = createNativeStackNavigator<RouteStackParamsList>();

const Navigation = observer(({ children }: { children: ReactNode }) => {
	return (
		<NavigationContainer>
			{children}

			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{Object.keys(appRoutes).map((key) => (
					<Stack.Screen
						key={key}
						name={key as keyof typeof appRoutes}
						component={appRoutes[key as keyof typeof appRoutes].component}
						options={appRoutes[key as keyof typeof appRoutes].options}
					/>
				))}
			</Stack.Navigator>
		</NavigationContainer>
	);
});

export { Navigation };
