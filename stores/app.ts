import { FALLBACK_LANGUAGE } from "@/configs/i18n";
import type { LanguageType } from "@/types";
import { observable } from "@legendapp/state";

type AppType = {
  locale: LanguageType;
  font: number;
};

const app$ = observable<AppType>({
  locale: FALLBACK_LANGUAGE,
  font: 16,
});

export { app$ };
