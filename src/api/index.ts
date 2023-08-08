import AsyncStorage from '@react-native-async-storage/async-storage';

import { CacheUsers } from './CacheUsers';
import { User } from './HttpClient';

class Api extends CacheUsers {
  public async getUsers(): Promise<User[]> {
    return await Api.getUsersRoutine();
  }

  public async clearAsyncStorage(): Promise<void> {
    return await AsyncStorage.clear();
  }
}

//Export only one Instance of the Api class
export const API: Api = new Api();
