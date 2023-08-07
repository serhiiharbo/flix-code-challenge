import { makeAutoObservable, runInAction } from 'mobx';

import { User } from '../api/HttpClient';
import { API } from '../api';

export class UsersStore {
  users?: User[] = [];

  loading?: boolean = true;
  errored?: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getUsers(): Promise<void> {
    try {
      this.loading = true;
      console.log(1, 'API GET USERS');

      const users: User[] = await API.getUsers();

      runInAction((): void => {
        console.log(1, 'RUN IN ACTION', users);
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
