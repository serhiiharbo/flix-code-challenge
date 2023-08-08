import { makeAutoObservable, runInAction } from 'mobx';

import { CacheSort, EOrderBy, TSort } from '../api/cache/CacheSort';
import { User } from '../api/HttpClient';

interface ISortStore {
  sortBy: keyof User;
  orderBy: keyof typeof EOrderBy;

  getSort(): Promise<void>;

  setSort(columnName: keyof User): Promise<void>;
}

export class SortStore implements ISortStore {
  // We must assign properties to a value, otherwise makeAutoObservable want make them observable
  sortBy: keyof User = undefined;
  orderBy: keyof typeof EOrderBy = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  public async getSort(): Promise<void> {
    try {
      const sort: TSort = await CacheSort.getSortFromAsyncStorage();

      runInAction(() => {
        this.sortBy = sort.sortBy;
        this.orderBy = sort.orderBy;
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.sortBy = undefined;
        this.orderBy = undefined;
      });
    }
  }

  public async setSort(columnName: keyof User): Promise<void> {
    try {
      const newSortParams: TSort = {
        // Set new Column name to Sort By
        sortBy: columnName,
      };

      // Case 1: same column header pressed -> toggle orderBy
      if (columnName === this.sortBy) {
        // Toggle order by ASC <-> DESC
        // undefined is initial value to check the very first sortBy change
        newSortParams.orderBy = this.orderBy === EOrderBy.ASC || this.orderBy === undefined
          ? EOrderBy.DESC
          : EOrderBy.ASC;
      } else {
        // Case 2: new column header pressed -> set ASC as default orderBy value
        newSortParams.orderBy = EOrderBy.ASC;
      }

      const { sortBy, orderBy }: TSort = newSortParams;
      this.sortBy = sortBy;
      this.orderBy = orderBy;

      return await CacheSort.setSortToAsyncStorage({ sortBy, orderBy });
    } catch (e: unknown) {
    }
  }
}
