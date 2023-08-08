import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import { ImageRequireSource } from 'react-native/Libraries/Image/ImageSource';

type TIconProps = {
  source: ImageRequireSource,
  styles?: ImageStyle,
}
type TImageStyle = {
  image: ImageStyle;
};

export const Icon: React.ElementType<TIconProps> = ({ source, styles }: TIconProps) => (
  <Image
    resizeMode={'center'}
    source={source}
    style={[defaultIconStyles.image, styles]}
  />
);

const defaultIconStyles: TImageStyle = StyleSheet.create<TImageStyle>({
  image: {
    width: 48,
    height: 45,
  },
});
