import { makeAutoObservable, runInAction } from 'mobx';

import { PersistTtl } from '../api/PersistTtl';
import { NO_TTL } from '../constants';

export class TtlStore {
  ttl: string = NO_TTL;

  constructor() {
    makeAutoObservable(this);
  }

  public async getTtl(): Promise<void> {
    try {
      const ttl: number | null = await PersistTtl.getTTL();

      runInAction((): void => {
        this.ttl = Number.isInteger(ttl) ? (new Date(ttl)).toTimeString() : NO_TTL;
      });
    } catch (e: unknown) {
      runInAction((): void => {
        this.ttl = NO_TTL;
      });
    }
  }

}
