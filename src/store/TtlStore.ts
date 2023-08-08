import { makeAutoObservable, runInAction } from 'mobx';
import { CacheTtl } from '../api/CacheTtl';
import { NO_TTL } from '../constants/assets.constants';

export class TtlStore {
  ttl: string = NO_TTL;

  constructor() {
    makeAutoObservable(this);
  }

  public async getTtl(): Promise<void> {
    try {
      console.log('GET TTL');

      const ttl: number | null = await CacheTtl.getTTL();

      runInAction((): void => {
        if (Number.isInteger(ttl)) {
          // console.log('RUN IN ACTION: TTL', ttl, (new Date(ttl)).toTimeString());
          this.ttl = (new Date(ttl)).toTimeString();
        } else {
          this.ttl = NO_TTL;
        }
      });
    } catch (e: unknown) {
      runInAction((): void => {
        this.ttl = NO_TTL;
      });
    }
  }

}
