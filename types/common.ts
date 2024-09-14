type LanguageType = 'vi' | 'en';

type OptionType<TCode = string> = {
	code: TCode;
	label?: string;
	subLabel?: string;
	onPress?: () => void;
};

type KeyValueType<
	TKey extends string | number | symbol = string,
	TValue = string | number | boolean | object,
> = {
	[key in TKey]: TValue;
};

type MediaType = {
	width: number;
	height: number;
	uri: string;
	type: string;
};

export type { OptionType, KeyValueType, LanguageType, MediaType };
