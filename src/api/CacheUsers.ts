import AsyncStorage from '@react-native-async-storage/async-storage';

import { ASKeys } from './constants';
import { HttpClient, User } from './HttpClient';
import { CacheTtl } from './CacheTtl';

export class CacheUsers extends CacheTtl {
  private static readonly usersKey: string = ASKeys.Users;

  // private static readonly sortBy: string = ASKeys.SortBy;

  private static async setUsersToAsyncStorage(users: User[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CacheUsers.usersKey, JSON.stringify(users));
    } catch (e: unknown) {
    }
  }

  // JSON.parse still returns any in TS
  private static async getUsersFromAsyncStorage(): Promise<any> {
    try {
      const usersJSON: string | null = await AsyncStorage.getItem(CacheUsers.usersKey);

      // @ts-ignore: Nullish coalescing operator protects us from passing null to .parse function
      return usersJSON ?? JSON.parse(<string>usersJSON);
    } catch (e: unknown) {
      return null;
    }
  }

  private static async getUsersRoutine(forceFetch?: boolean): Promise<User[]> {
    try {
      const isTTLExpired: boolean = await CacheUsers.isTTLExpired();
      __DEV__ && console.warn(1, { forceFetch, isTTLExpired });

      if (forceFetch || isTTLExpired) {
        __DEV__ && console.warn(2, { forceFetch, isTTLExpired });
        const users: User[] = await HttpClient.fetchUsers();
        await CacheUsers.setUsersToAsyncStorage(users);
        await CacheUsers.setTTL();

        return users;
      } else {
        const users: User[] | null | any = await CacheUsers.getUsersFromAsyncStorage();

        // Re-fetch users from HttpClient if error occurred during fetching from Async Storage or
        // parsing json
        return users || CacheUsers.getUsersRoutine(true);
      }
    } catch (e: unknown) {
      return CacheUsers.getUsersRoutine(true);
    }
  }

  public static async getUsers() {
    return await CacheUsers.getUsersRoutine();
  }
}
