import { i18n } from '@/configs/i18n';
import { app$ } from '@/stores';
import type { KeyValueType } from '@/types';

const trans = (key: string, param?: KeyValueType<string, string>) => {
	const data = i18n.t(key, param);

	i18n.locale = app$.locale.get();
	i18n.defaultLocale = app$.locale.get();

	return data;
};

export { trans };
