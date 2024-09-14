module.exports = (api) => {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"react-native-reanimated/plugin",
			"@legendapp/state/babel",
			[
				"module-resolver",
				{
					root: ["."],
					alias: {
						"@/": "./",
					},
				},
			],
		],
	};
};
