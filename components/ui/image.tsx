import { image } from '@/assets';
import { type SxProp, useSx } from 'dripsy';
import { useEffect, useState } from 'react';
import {
	Image as EPImage,
	type ImageProps as EPImageProps,
} from 'react-native';

type ImageProps = Omit<
	EPImageProps,
	'source' | 'style' | 'width' | 'height' | 'placeholder' | 'tintColor'
> & {
	source?: keyof typeof image | (string & NonNullable<unknown>);
	placeholder?: keyof typeof image | (string & NonNullable<unknown>);
	sx?: SxProp;
};

const Image = ({ source, placeholder, sx, ...props }: ImageProps) => {
	const sxStyle = useSx();

	const [_source, setSource] = useState(() => {
		const result = image?.[source as keyof typeof image];

		if (result) {
			return result;
		}

		if (source) {
			return {
				uri: source,
			};
		}

		return image?.[placeholder as keyof typeof image] || image.PictureIcon;
	});

	const onError = () => {
		setSource(image[placeholder as keyof typeof image] || image.PictureIcon);
	};

	useEffect(() => {
		if (image[source as keyof typeof image]) {
			setSource(image[source as keyof typeof image]);

			return;
		}

		if (source) {
			setSource({
				uri: source,
			});

			return;
		}

		setSource(image[placeholder as keyof typeof image] || image.PictureIcon);
	}, [source, placeholder]);

	return (
		<EPImage
			{...props}
			style={sxStyle(sx || {})}
			source={_source}
			onError={onError}
		/>
	);
};

export { Image };
