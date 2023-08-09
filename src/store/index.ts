import { TtlStore } from './TtlStore';
import { UsersStore } from './UsersStore';

export type TRootStore = {
  ttlStore: TtlStore;
  usersStore: UsersStore;
}

export class RootStore implements TRootStore {
  ttlStore: TtlStore;
  usersStore: UsersStore;


  constructor() {
    this.ttlStore = new TtlStore();
    this.usersStore = new UsersStore();
  }
}

export default new RootStore(); // export singleton
