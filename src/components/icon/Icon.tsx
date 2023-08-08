import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import { ImageRequireSource } from 'react-native/Libraries/Image/ImageSource';

export const Icon: React.ElementType<TIconProperties> = ({ source, styles }: TIconProperties) => (
  <Image
    source={source}
    style={[defaultIconStyles.image, styles]}
    resizeMode={'center'}
  />
);

type TImageStyle = {
  image: ImageStyle;
};

type TIconProperties = {
  source: ImageRequireSource,
  styles?: ImageStyle,
}

const defaultIconStyles: TImageStyle = StyleSheet.create<TImageStyle>({
  image: {
    width: 48,
    height: 45,
  },
});
