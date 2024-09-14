import { useEffectOnce, useObservable } from '@legendapp/state/react';
import {
	type Album,
	type Asset,
	type PagedInfo,
	getAlbumsAsync,
	getAssetsAsync,
	usePermissions,
} from 'expo-media-library';

type LibraryType = {
	album: Album;
	media: PagedInfo<Asset>;
};

const useMediaLibrary = (onDenied?: () => void) => {
	const gettingAssets$ = useObservable(false);
	const [permissionResponse, requestPermission] = usePermissions();

	const assets$ = useObservable<LibraryType[]>([]);

	useEffectOnce(() => {
		const getFiles = async () => {
			gettingAssets$.set(true);

			if (permissionResponse?.status !== 'granted') {
				await requestPermission();
			}

			const fetchedAlbums = await getAlbumsAsync({
				includeSmartAlbums: true,
			});

			fetchedAlbums.forEach(async (album, index) => {
				const fetchedFiles = await getAssetsAsync({ album });

				if (fetchedFiles.totalCount) {
					assets$[index]?.album.set(album);
					assets$[index]?.media.set(fetchedFiles);
				}
			});

			gettingAssets$.set(false);
		};

		getFiles();
	}, []);

	if (!permissionResponse?.granted) {
		onDenied?.();

		return {
			gettingAssets: false,
			assets: [],
		};
	}

	return {
		gettingAssets: gettingAssets$.get(),
		assets: assets$.get(),
	};
};

export { useMediaLibrary, type LibraryType };
