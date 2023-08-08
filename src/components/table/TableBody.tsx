import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';

import { SortStore } from '../../store/SortStore';
import { TableBodyCells } from './TableBodyCells';
import { TColumns } from './TableView';
import { TStyle } from '../../types/shared.types';
import { User } from '../../api/HttpClient';

type TTableBodyProps = {
  columns: TColumns;
  sortStore: SortStore,
  users: User[],
};

type TRenderItemParams = {
  item: User,
  index: number
}

export const TableBody: React.FunctionComponent<TTableBodyProps> =
  observer(({
              columns,
              sortStore,
              users,
            }: TTableBodyProps) => {

    return (
      <FlatList
        data={users}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item: User, index: number): string => `${index} - ${item[columns?.[0]]}`}
        renderItem={({ item, index }: TRenderItemParams) => (
          <View style={styles.rowContainer}>
            {
              columns.map((columnName: keyof User, i: number) => {
                return (
                  <TableBodyCells
                    columnName={columnName}
                    i={i}
                    item={item}
                    key={`${index} - ${i} - ${columnName} : ${item[columns?.[i]]}`}
                    sortStore={sortStore}
                  />
                );
              })
            }
          </View>
        )}
      />);
  });

const styles: TStyle = StyleSheet.create<TStyle>({
  flatListContainer: {
    flexGrow: 1,
    marginTop: -1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    minHeight: 50,

    borderColor: 'black',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  rowCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
  },
  text: {
    fontSize: 20,
  },
});
