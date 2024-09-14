import type { image } from '@/assets';
import { homeTabRoutes } from '@/configs/tab';
import type { HomeTabStackParamsList } from '@/types/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDripsyTheme } from 'dripsy';
import { Image } from '../ui/image';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator<HomeTabStackParamsList>();

const HomeStackScreen = () => {
	return (
		<HomeStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{Object.keys(homeTabRoutes).map((key) => (
				<HomeStack.Screen
					key={key}
					name={key as keyof typeof homeTabRoutes}
					component={homeTabRoutes[key as keyof typeof homeTabRoutes].component}
				/>
			))}
		</HomeStack.Navigator>
	);
};

const MainTabNavigation = () => {
	const { theme } = useDripsyTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarInactiveTintColor: theme.colors.gray300,
				tabBarActiveTintColor: theme.colors.black,
				tabBarShowLabel: false,
				tabBarIcon: ({ focused, color, size }) => {
					let icon: keyof typeof image = focused
						? 'HomeFillIcon'
						: 'HomeOutlineIcon';

					if (route.name === 'SearchScreen') {
						icon = focused ? 'SearchFillIcon' : 'SearchOutlineIcon';
					}

					return (
						<Image
							source={icon}
							sx={{
								tintColor: color,
								width: size,
								height: size,
							}}
						/>
					);
				},
			})}
		>
			<Tab.Screen
				name='HomeStack'
				component={HomeStackScreen}
			/>
		</Tab.Navigator>
	);
};

export { MainTabNavigation };
