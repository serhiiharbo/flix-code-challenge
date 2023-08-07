import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';

import { TColumns } from './TableView';
import { User } from '../api/HttpClient';
import { TStyle } from '../types/shared.types';

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
        keyExtractor={(item: User, index: number) => `${index} - ${item[columns?.[0]]}`}
        renderItem={({ item, index }: RenderItemParams) => (
          <View style={styles.rowContainer}>
            {
              columns.map((columnName: keyof User, i: number) => {
                return (
                  <View
                    key={`${index} - ${i} - ${columnName} : ${item[columns?.[i]]}`}
                    style={[styles.rowCell, { borderRightWidth: i === 0 ? 0 : 1 }]}
                  >
                    <Text style={styles.text}>
                      {`${item[columnName]}`}
                    </Text>
                  </View>
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
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    minHeight: 50,

    borderColor: 'black',
    borderWidth: 1,
  },
  rowCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
  },
});
