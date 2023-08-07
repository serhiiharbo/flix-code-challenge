type TRequire = {
  [key: string]: NodeRequire
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
};
