import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../context/AppContext';
import { EOrderBy } from '../api/CacheSort';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TRootStore } from '../store';
import { User } from '../api/HttpClient';
import { TStyle } from '../types/shared.types';

type TKeys = {
  [key: string]: boolean;
}
export type TColumns = [keyof User];
export type TColumnsState = [keyof User, React.Dispatch<React.SetStateAction<TColumns>>];

export const TableView: React.FunctionComponent = observer(() => {
  const store: TRootStore = useContext(AppContext);
  const [columns, setColumns] = useState<TColumns>([] as unknown as TColumns);
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  const {
    usersStore: { users, loading, errored },
    sortStore: { sortBy, orderBy },
  }: TRootStore = store;
  // const

  useEffect((): void => {
    store.usersStore.getUsers();
    store.sortStore.getSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create header columns names list
  useEffect((): void => {
    const isObject = (obj: unknown): boolean => (obj ?? false)?.constructor?.name === 'Object';

    const columnTitlesObject: TKeys = users.reduce((acc: TKeys, user: User): TKeys => {
      const keys: string[] = isObject(user) ? Object.keys(user) : [];
      keys.forEach((key: string): boolean => acc[key] = true);

      return acc;
    }, {});

    const columnTitles: TColumns = Object.keys(columnTitlesObject) as TColumns;

    setColumns(columnTitles);
  }, [users]);

  // Sort users by field and order
  useEffect((): void => {
    const newSortedUsersList: User[] = [...users].sort((u1: User, u2: User): number => {
      const val1: User[keyof User] = u1[sortBy];
      const val2: User[keyof User] = u2[sortBy];

      if (Number.isInteger(val1) && Number.isInteger(val2)) {
        return (orderBy === EOrderBy.ASC) ?
          (val1 as number) - (val2 as number) :
          (val2 as number) - (val1 as number);
      } else {
        return (orderBy === EOrderBy.ASC) ?
          (val1 as string).localeCompare(val2 as string) :
          (val2 as string).localeCompare(val1 as string);
      }
    });

    setSortedUsers(newSortedUsersList);
  }, [users, sortBy, orderBy]);

  return (
    <View style={styles.table}>
      <TableHeader columns={columns} />
      <TableBody
        columns={columns}
        users={sortedUsers}
      />
    </View>
  );
});


const styles: TStyle = StyleSheet.create<TStyle>({ table: { flexGrow: 1 } });

