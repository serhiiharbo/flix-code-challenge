import { ImageRequireSource } from 'react-native/Libraries/Image/ImageSource';

type TRequire = {
  [key: string]: ImageRequireSource
}

type TImages = {
  [key: string]: TRequire
}

export const IMAGES: TImages = {
  SORT: {
    ASC: require('../assets/arrows-down.png'),
    DESC: require('../assets/arrows-up.png'),
    DEFAULT: require('../assets/arrows-default.png'),
  },
  ERROR: {
    CELL: require('../assets/error.png'),
  },
};

type HexColor = `#${string}`
export const backgroundColor: HexColor = '#73d700';

export const NO_TTL: string = 'No TTL so far';
