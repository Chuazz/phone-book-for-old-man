import { makeTheme } from 'dripsy';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const GAP_MD = 12;
const GAP_LG = 16;

const INPUT_HEIGHT = 60;

const RADIUS_FULL = 500;

const HEADER_HEIGHT = 50;

const light = {
	transparent: 'transparent',

	white: '#fff',
	whiteAlpha300: 'rgba(255,255,255, 0.3)',
	whiteAlpha400: 'rgba(255,255,255, 0.4)',
	whiteAlpha500: 'rgba(255,255,255, 0.5)',

	black: '#000',
	blackAlpha300: 'rgba(0, 0, 0, 0.3)',
	blackAlpha400: 'rgba(0, 0, 0, 0.4)',
	blackAlpha500: 'rgba(0, 0, 0, 0.5)',

	primary50: '#ecfaff',
	primary100: '#d4f2ff',
	primary200: '#b2eaff',
	primary300: '#7de0ff',
	primary400: '#40cbff',
	primary500: '#14abff',
	primary600: '#008bff',
	primary700: '#0073ff',
	primary800: '#0064df',
	primary900: '#0850a0',
	primary950: '#0a3161',

	gray50: '#fefefe',
	gray100: '#efefef',
	gray200: '#dcdcdc',
	gray300: '#bdbdbd',
	gray400: '#989898',
	gray500: '#7c7c7c',
	gray600: '#656565',
	gray700: '#525252',
	gray800: '#464646',
	gray900: '#3d3d3d',
	gray950: '#292929',

	red50: '#fff1f1',
	red100: '#ffe4e4',
	red200: '#fdced1',
	red300: '#fba6aa',
	red400: '#f8747e',
	red500: '#f14254',
	red600: '#dd213d',
	red700: '#bb1532',
	red800: '#a71634',
	red900: '#861530',
	red950: '#4b0615',
};

const dark = {};

export {
	GAP_MD,
	GAP_LG,
	INPUT_HEIGHT,
	RADIUS_FULL,
	HEADER_HEIGHT,
	light,
	dark,
};

const theme = makeTheme({
	colors: {
		...light,

		modes: {
			dark,
		},
	},
	radii: {
		full: RADIUS_FULL,
		xs: 4,
		sm: 8,
		md: GAP_MD,
		lg: 16,
		xl: 24,
	},
	space: {
		xs: 4,
		sm: 8,
		md: GAP_MD,
		lg: GAP_LG,
		xl: 24,
	},
	fontSizes: {
		sm: 12,
		md: 14,
		lg: 16,
		xl: 24,
		'2xl': 32,
		'3xl': 40,
		'4xl': 48,
	},
	sizes: {
		full: '100%',
		'screen-height': SCREEN_HEIGHT,
		'screen-width': SCREEN_WIDTH,
		'icon-sm': 20,
		'icon-md': 24,
		'icon-lg': 28,
		'icon-xl': 40,
	},
	customFonts: {
		PublicSans: {
			default: 'PublicSans-Medium',

			regular: 'PublicSans',
			medium: 'PublicSans-Medium',
			semibold: 'PublicSans-SemiBold',
			bold: 'PublicSans-Bold',
			extraBold: 'PublicSans-ExtraBold',
			black: 'PublicSans-Black',

			400: 'PublicSans',
			500: 'PublicSans-Medium',
			600: 'PublicSans-SemiBold',
			700: 'PublicSans-Bold',
			800: 'PublicSans-ExtraBold',
			900: 'PublicSans-Black',
		},
	},
	fonts: {
		root: 'PublicSans',
	},
});

type MyTheme = typeof theme;

declare module 'dripsy' {
	interface DripsyCustomTheme extends MyTheme {}
}

export { theme, SCREEN_HEIGHT, SCREEN_WIDTH };
