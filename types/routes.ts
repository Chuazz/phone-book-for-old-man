import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Contact } from "react-native-contacts";

type AppStackParamsList = {
  HomeScreen: undefined;
  DetailScreen: {
    contact: Contact;
  };
};

type RouteStackParamsList = AppStackParamsList;

type ScreenProps<T extends keyof RouteStackParamsList> = NativeStackScreenProps<
  RouteStackParamsList,
  T
>;

export type { RouteStackParamsList, AppStackParamsList, ScreenProps };
