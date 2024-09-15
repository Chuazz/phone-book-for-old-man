import { DetailScreen } from "@/screens/detail";
import { HomeScreen } from "@/screens/home";
import type { AppStackParamsList, KeyValueType } from "@/types";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import type { FC } from "react";

const appRoutes: KeyValueType<
  keyof AppStackParamsList,
  {
    options?: NativeStackNavigationOptions;
    component: FC<any>;
  }
> = {
  HomeScreen: {
    component: HomeScreen,
  },
  DetailScreen: {
    component: DetailScreen,
  },
};

const routes = {
  ...appRoutes,
};

export { appRoutes, routes };
