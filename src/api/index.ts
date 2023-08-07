import { CacheUsers } from './CacheUsers';
import { User } from './HttpClient';

class Api extends CacheUsers {
  public async getUsers(): Promise<User[]> {
    return await Api.getUsersRoutine();
  }
}

/**
 * Export only one Instance of the Api class
 */
export const API: Api = new Api();
