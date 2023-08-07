import { makeAutoObservable, runInAction } from 'mobx';
import { CacheSort, EOrderBy, TSort } from '../api/CacheSort';
import { User } from '../api/HttpClient';

// type UserKeys<Type> = keyof Type;
// type UserKeys = keyof User;

export class SortStore {
  // We must assign properties to a value, otherwise makeAutoObservable want make them observable
  sortBy: keyof User = undefined;
  orderBy: keyof typeof EOrderBy = undefined;

  constructor() {
    makeAutoObservable(this);
    // this.getSort();
  }

  async getSort() {
    try {
      console.log(11, 'GET SORT');

      const sort: TSort = await CacheSort.getSortFromAsyncStorage();

      runInAction(() => {
        console.log(22, 'RUN IN ACTION: SORT', sort);
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

  async setSort(columnName: keyof User): Promise<void> {
    try {
      console.log(112, 'SET SORT');
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
