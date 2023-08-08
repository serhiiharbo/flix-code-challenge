import React from 'react';
import { observer } from 'mobx-react-lite';

import { EOrderBy } from '../../api/cache/CacheSort';
import { Icon } from '../icon/Icon';
import { IMAGES } from '../../constants';
import { SortStore } from '../../store/SortStore';
import { User } from '../../api/HttpClient';

type TSortImageProps = {
  sortStore: SortStore;
  columnName: keyof User;
};

export const SortImage: React.FunctionComponent<TSortImageProps> =
  observer(({
              sortStore,
              columnName,
            }: TSortImageProps) => {
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



