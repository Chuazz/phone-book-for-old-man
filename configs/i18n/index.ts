import { I18n } from "i18n-js";
import type { KeyValueType, LanguageType, OptionType } from "@/types";

import enCommon from "./locales/en/common.json";
import enInfo from "./locales/en/info.json";
import enPermission from "./locales/en/permission.json";

import viCommon from "./locales/vi/common.json";
import viInfo from "./locales/vi/info.json";
import viPermission from "./locales/vi/permission.json";

const LANGUAGES: KeyValueType<LanguageType, OptionType<LanguageType>> = {
  vi: {
    code: "vi",
    label: "Việt Nam",
  },
  en: {
    code: "en",
    label: "English (US)",
  },
};

const SUPPORT_LANGUAGES = Object.keys(LANGUAGES).map(
  (key) => LANGUAGES[key as LanguageType]
);

const FALLBACK_LANGUAGE = LANGUAGES.vi.code;

const FALLBACK_NAMESPACE = "common";

const translations: KeyValueType<LanguageType, unknown> = {
  en: {
    common: enCommon,
    info: enInfo,
    permission: enPermission,
  },
  vi: {
    common: viCommon,
    info: viInfo,
    permission: viPermission,
  },
};

const i18n = new I18n(translations);

export {
  FALLBACK_LANGUAGE,
  FALLBACK_NAMESPACE,
  i18n,
  LANGUAGES,
  SUPPORT_LANGUAGES,
};
