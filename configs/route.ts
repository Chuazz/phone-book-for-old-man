import { DetailScreen } from "@/screens/detail";
import { HomeScreen } from "@/screens/home";
import { UpdateLogScreen } from "@/screens/update-log";
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
  UpdateLogScreen: {
    component: UpdateLogScreen,
  },
};

const routes = {
  ...appRoutes,
};

export { appRoutes, routes };
