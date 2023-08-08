import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';

import { EOrderBy } from '../../api/CacheSort';
import { IMAGES } from '../../constants/assets.constants';
import { SortStore } from '../../store/SortStore';
import { User } from '../../api/HttpClient';

type SortImageProps = {
  sortStore: SortStore;
  columnName: keyof User;
};

const Icon: React.ElementType = ({ source }) => (
  <Image
    source={source}
    style={styles.image}
    resizeMode={'center'}
  />
);

export const SortImage: React.FunctionComponent<SortImageProps> =
  observer(({
              sortStore,
              columnName,
            }: SortImageProps) => {
    if (sortStore.sortBy !== columnName) {
      return <Icon source={IMAGES.SORT.DEFAULT} />;
    }

    switch (sortStore.orderBy) {
      case EOrderBy.ASC:
        return <Icon source={IMAGES.SORT.ASC} />;
      case EOrderBy.DESC:
        return <Icon source={IMAGES.SORT.DESC} />;
      default:
        return <Icon source={IMAGES.SORT.DEFAULT} />;
    }
  });

type TImageStyle = {
  image: ImageStyle;
};

const styles: TImageStyle = StyleSheet.create<TImageStyle>({
  image: {
    width: 50,
    height: 50,
  },
});
