import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';

import { TableBodyCells } from './TableBodyCells';
import { TColumns } from './TableView';
import { TStyle } from '../../types/shared.types';
import { User } from '../../api/HttpClient';

type TableBodyProps = {
  columns: TColumns;
  users: User[],
};

type RenderItemParams = {
  item: User,
  index: number
}

export const TableBody: React.FunctionComponent<TableBodyProps> =
  observer(({
              columns,
              users,
            }: TableBodyProps) => {

    return (
      <FlatList
        data={users}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item: User, index: number): string => `${index} - ${item[columns?.[0]]}`}
        renderItem={({ item, index }: RenderItemParams) => (
          <View style={styles.rowContainer}>
            {
              columns.map((columnName: keyof User, i: number) => {
                return (
                  <TableBodyCells
                    key={`${index} - ${i} - ${columnName} : ${item[columns?.[i]]}`}
                    item={item}
                    i={i}
                    columnName={columnName}
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
