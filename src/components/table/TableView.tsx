import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';

import { EOrderBy, TColumns, TSort, TStyle } from '../../types/shared.types';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TRootStore } from '../../store';
import { User } from '../../api/HttpClient';
import { UsersStore } from '../../store/UsersStore';

type TTableViewProps = {
  store: TRootStore
}
type TKeys = {
  [key: string]: boolean;
}
type TColumnsState = [TColumns, React.Dispatch<React.SetStateAction<TColumns>>];
type TSortedUsersState = [User[], React.Dispatch<React.SetStateAction<User[]>>];
type TSortParamsState = [TSort, React.Dispatch<React.SetStateAction<TSort>>];

export const TableView: React.FunctionComponent<TTableViewProps> = observer(({ store }: TTableViewProps) => {
  const [columns, setColumns]: TColumnsState = useState<TColumns>([] as unknown as TColumns);
  const [sortedUsers, setSortedUsers]: TSortedUsersState = useState<User[]>([]);
  const [sortParams, setSortParams]: TSortParamsState = useState<TSort>({});

  const { sortBy, orderBy }: TSort = sortParams;
  const { usersStore }: TRootStore = store;
  const { users }: UsersStore = usersStore;

  // Set sort parameters to state
  const setSort = async (columnName: keyof User): Promise<void> => {
    try {
      const newSortParams: TSort = {
        // Set new Column name to Sort By
        sortBy: columnName,
      };

      // Case 1: same column header pressed -> toggle orderBy
      if (columnName === sortBy) {
        // Toggle order by ASC <-> DESC
        // undefined is initial value to check the very first sortBy change
        newSortParams.orderBy = orderBy === EOrderBy.ASC || orderBy === undefined
          ? EOrderBy.DESC
          : EOrderBy.ASC;
      } else {
        // Case 2: new column header pressed -> set ASC as default orderBy value
        newSortParams.orderBy = EOrderBy.ASC;
      }

      return setSortParams(newSortParams);
    } catch (e: unknown) {
    }
  };

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
    // Check do we have sorting properties before sorting users
    if (sortBy && orderBy) {
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
    } else {
      // Set users 'as is' if no sorting props present
      setSortedUsers(users);
    }
  }, [users, sortBy, orderBy]);

  return (
    <View style={styles.container}>
      <TableHeader
        columns={columns}
        sortParams={sortParams}
        setSort={setSort}
      />
      <TableBody
        columns={columns}
        users={sortedUsers}
        sortParams={sortParams}
      />
    </View>
  );
});


const styles: TStyle = StyleSheet.create<TStyle>({ container: { flexGrow: 1, marginBottom: 40 } });
