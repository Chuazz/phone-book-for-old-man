import Reactotron from 'reactotron-react-native';

if (__DEV__) {
	Reactotron.configure({
		name: 'phone-book-for-old-man',
	})
		.useReactNative({
			asyncStorage: true,
			networking: {
				ignoreUrls: /symbolicate/,
			},
		})
		.connect();
}
