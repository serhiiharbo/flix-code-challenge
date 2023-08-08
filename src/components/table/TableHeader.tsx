import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TableHeaderCell } from './TableHeaderCell';
import { TColumns, TSort, TStyle } from '../../types/shared.types';
import { User } from '../../api/HttpClient';

type TableHeaderProps = {
  columns: TColumns;
  setSort(columnName: keyof User): Promise<void>,
  sortParams: TSort,
};

export const TableHeader: React.FunctionComponent<TableHeaderProps> =
  ({
     columns,
     sortParams,
     setSort,
   }: TableHeaderProps) =>
    (<View style={styles.headerContainer}>
      {
        columns.map<React.JSX.Element>((columnName: keyof User, index: number) => (
          <TableHeaderCell
            key={`${index} - ${columnName}`}
            columnName={columnName}
            index={index}
            sortParams={sortParams}
            setSort={setSort}
          />
        ))
      }
    </View>);


const styles: TStyle = StyleSheet.create<TStyle>({
  headerContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
