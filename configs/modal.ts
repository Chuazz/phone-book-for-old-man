import type { KeyValueType } from "@/types";
import type { ModalOptions } from "react-native-modalfy";

type ModalStackParamsList = {};

const defaultOptions: ModalOptions = {
  backdropOpacity: 0.4,
  backBehavior: "clear",
  disableFlingGesture: true,
};

const modal: KeyValueType<keyof ModalStackParamsList, ModalOptions> = {};

export { defaultOptions, modal };
export type { ModalStackParamsList };
