import { UsersStore } from './UsersStore';
import { SortStore } from './SortStore';

export type TRootStore = {
  // ttlStore: TtlStore;
  usersStore: UsersStore;
  sortStore: SortStore;
}

export class RootStore implements TRootStore {
  // ttlStore: TtlStore;
  usersStore: UsersStore;
  sortStore: SortStore;


  constructor() {
    // this.ttlStore = new TtlStore();
    this.usersStore = new UsersStore();
    this.sortStore = new SortStore();
  }
}

export default new RootStore();

