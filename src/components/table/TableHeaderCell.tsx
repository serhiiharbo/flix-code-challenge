import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../../context/AppContext';
import { SortImage } from './SortImage';
import { SortStore } from '../../store/SortStore';
import { TRootStore } from '../../store';
import { TStyle } from '../../types/shared.types';
import { User } from '../../api/HttpClient';

type TTableHeaderCellProps = {
  columnName: keyof User;
  index: number
};

export const TableHeaderCell: React.FunctionComponent<TTableHeaderCellProps> =
  observer(({
              columnName,
              index,
            }: TTableHeaderCellProps) => {
    const store: TRootStore = useContext(AppContext);
    const sortStore: SortStore = store.sortStore;

    return (
      <Pressable
        style={[styles.columnCell, { borderRightWidth: index === 0 ? 0 : 1 }]}
        onPress={() => sortStore.setSort(columnName)}
      >
        <Text style={styles.font}>
          {`${columnName?.toUpperCase()}`}
        </Text>
        <SortImage
          sortStore={sortStore}
          columnName={columnName}
        />
      </Pressable>
    );
  });


const styles: TStyle = StyleSheet.create<TStyle>({
  columnCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  font: {
    fontSize: 20,
  },
});
