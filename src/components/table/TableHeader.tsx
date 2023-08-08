import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TableHeaderCell } from './TableHeaderCell';
import { TColumns } from './TableView';
import { TStyle } from '../../types/shared.types';
import { User } from '../../api/HttpClient';

type TableHeaderProps = {
  columns: TColumns;
};

export const TableHeader: React.FunctionComponent<TableHeaderProps> = ({ columns }: TableHeaderProps) =>
  (<View style={styles.headerContainer}>
    {
      columns.map<React.JSX.Element>((columnName: keyof User, index: number) => (
        <TableHeaderCell
          key={`${index} - ${columnName}`}
          columnName={columnName}
          index={index}
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
