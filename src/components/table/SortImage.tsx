import React from 'react';

import { EOrderBy, TSort } from '../../types/shared.types';
import { Icon } from '../icon/Icon';
import { IMAGES } from '../../constants';
import { User } from '../../api/HttpClient';

type TSortImageProps = {
  columnName: keyof User;
  sortParams: TSort,
};

export const SortImage: React.FunctionComponent<TSortImageProps> =
  ({ columnName, sortParams }: TSortImageProps) => {
    if (sortParams.sortBy !== columnName) {
      return <Icon source={IMAGES.SORT.DEFAULT} />;
    }

    switch (sortParams.orderBy) {
      case EOrderBy.ASC:
        return <Icon source={IMAGES.SORT.ASC} />;
      case EOrderBy.DESC:
        return <Icon source={IMAGES.SORT.DESC} />;
      default:
        return <Icon source={IMAGES.SORT.DEFAULT} />;
    }
  };
