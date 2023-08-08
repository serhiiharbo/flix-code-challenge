import AsyncStorage from '@react-native-async-storage/async-storage';

import { ASKeys } from '../constants';
import { User } from '../HttpClient';

export enum EOrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ESort {
  sortBy = 'sortBy',
  orderBy = 'orderBy',
}

export type TSort = {
  [ESort.sortBy]?: keyof User | undefined,
  [ESort.orderBy]?: keyof typeof EOrderBy | undefined,
}

export class CacheSort {
  private static readonly sortKey: string = ASKeys.SortBy;

  public static async setSortToAsyncStorage(sortBy: TSort): Promise<void> {
    try {
      await AsyncStorage.setItem(CacheSort.sortKey, JSON.stringify(sortBy));
    } catch (e: unknown) {
    }
  }

  // JSON.parse still returns any in TS, so :Promise<any> is our returning type :(
  public static async getSortFromAsyncStorage(): Promise<any> {
    try {
      const sortJSON: string | null = await AsyncStorage.getItem(CacheSort.sortKey);

      return sortJSON === null ? sortJSON : JSON.parse(<string>sortJSON);
    } catch (e: unknown) {
      return null;
    }
  }
}
