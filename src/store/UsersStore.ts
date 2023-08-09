import { makeAutoObservable, runInAction } from 'mobx';

import { API } from '../api/Api';
import { User } from '../api/HttpClient';

interface IUsersStore {
  users: User[];
  loading: boolean;
  errored: boolean;

  getUsers(): Promise<void>;
}

export class UsersStore implements IUsersStore {
  users: User[] = [];
  loading: boolean = true;
  errored: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getUsers(): Promise<void> {
    try {
      this.loading = true;
      const users: User[] = await API.getUsers();

      runInAction((): void => {
        this.users = users;
        this.loading = false;
      });
    } catch (e: unknown) {
      runInAction((): void => {
        this.errored = true;
        this.loading = false;
      });
    }

  }
}
