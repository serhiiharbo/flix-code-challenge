import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type TStyle = {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
};
