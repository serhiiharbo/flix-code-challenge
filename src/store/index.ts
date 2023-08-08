import { SortStore } from './SortStore';
import { TtlStore } from './TtlStore';
import { UsersStore } from './UsersStore';

export type TRootStore = {
  sortStore: SortStore;
  ttlStore: TtlStore;
  usersStore: UsersStore;
}

export class RootStore implements TRootStore {
  sortStore: SortStore;
  ttlStore: TtlStore;
  usersStore: UsersStore;


  constructor() {
    this.sortStore = new SortStore();
    this.ttlStore = new TtlStore();
    this.usersStore = new UsersStore();
  }
}

export default new RootStore(); // export singleton
