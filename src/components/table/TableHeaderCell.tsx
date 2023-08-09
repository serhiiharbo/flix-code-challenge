import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { SortImage } from './SortImage';
import { TSort, TStyle } from '../../types/shared.types';
import { User } from '../../api/HttpClient';

type TTableHeaderCellProps = {
  columnName: keyof User;
  index: number
  setSort(columnName: keyof User): Promise<void>,
  sortParams: TSort,
};

export const TableHeaderCell: React.FunctionComponent<TTableHeaderCellProps> =
  ({
     columnName,
     index,
     sortParams,
     setSort,
   }: TTableHeaderCellProps) => (
    <Pressable
      style={[styles.columnCell, { borderRightWidth: index === 0 ? 0 : 1 }]}
      onPress={() => setSort(columnName)}
    >
      <Text style={styles.font}>
        {`${columnName?.toUpperCase()}`}
      </Text>
      <SortImage
        sortParams={sortParams}
        columnName={columnName}
      />
    </Pressable>
  );


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
