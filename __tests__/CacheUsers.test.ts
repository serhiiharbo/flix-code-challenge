import AsyncStorage from '@react-native-async-storage/async-storage';

import { ASKeys } from '../src/api/constants';
import { CacheUsers } from '../src/api/cache/CacheUsers';
import { HttpClient, User } from '../src/api/HttpClient';

// TASK: Write a few tests to make sure your caching mechanism works as intended

describe('CacheUsers: check methods', (): void => {
  const cacheUsers: CacheUsers = new CacheUsers();
  const cacheUsersProto = Object.getPrototypeOf(cacheUsers); // To access private and protected static methods

  beforeEach(async (): Promise<void> => {
    await AsyncStorage.clear();
  });

  test('check CacheUsers.isTTLExpired result to be "true" before CacheUsers.getUsersRoutine even called',
    async (): Promise<void> => {
      const isTTLExpired: boolean = await cacheUsersProto.constructor.isTTLExpired();

      expect(isTTLExpired).toEqual(true);
    });

  test('when CacheUsers.getUsersRoutine is called FIRST TIME, check calling:' +
    ' CacheUsers.isTTLExpired,  CacheUsers.setUsersToAsyncStorage, CacheUsers.setTTL',
    async (): Promise<void> => {
      const setSpy1 = jest.spyOn(cacheUsersProto.constructor, 'isTTLExpired');
      const setSpy2 = jest.spyOn(HttpClient, 'fetchUsers');
      const setSpy3 = jest.spyOn(cacheUsersProto.constructor, 'setUsersToAsyncStorage');
      const setSpy4 = jest.spyOn(cacheUsersProto.constructor, 'setTTL');
      await cacheUsersProto.constructor.getUsersRoutine();

      expect(setSpy1).toBeCalled();
      expect(setSpy2).toBeCalled();
      expect(setSpy3).toBeCalled();
      expect(setSpy4).toBeCalled();
      setSpy1.mockClear();
      setSpy2.mockClear();
      setSpy3.mockClear();
      setSpy4.mockClear();
    });

  test('check CacheUsers.getUsersRoutine return same users list as HttpClient.fetchUsers',
    async (): Promise<void> => {
      const users1: User[] = await cacheUsersProto.constructor.getUsersRoutine();
      const users2: User[] = await HttpClient.fetchUsers();

      expect(users1).toEqual(users2);
    });
});

describe('CacheUsers: check Caching mechanism + session implementation', (): void => {
  const cacheUsers: CacheUsers = new CacheUsers();
  const cacheUsersProto = Object.getPrototypeOf(cacheUsers); // To access private and protected static methods

  beforeAll(async (): Promise<void> => {
    await AsyncStorage.clear();
    // Save TTL and Users to AsyncStorage
    await cacheUsersProto.constructor.getUsersRoutine();
  });

  test('check CacheUsers.isTTLExpired result to be "false" after CacheUsers.getUsersRoutine called',
    async (): Promise<void> => {
      const isTTLExpired: boolean = await cacheUsersProto.constructor.isTTLExpired();

      expect(isTTLExpired).toEqual(false);
    });

  test('check CacheUsers.getUsersFromAsyncStorage to be called, when CacheUsers.getUsersRoutine is called with valid TTL in AS',
    async (): Promise<void> => {
      const setSpy = jest.spyOn(cacheUsersProto.constructor, 'getUsersFromAsyncStorage');
      await cacheUsersProto.constructor.getUsersRoutine();

      expect(setSpy).toBeCalled();
      setSpy.mockClear();
    });

  test('when CacheUsers.getUsersRoutine is called with "forceFetch: true" param, ' +
    'check HttpClient.fetchUsers, CacheUsers.setUsersToAsyncStorage and CacheUsers.setTTL to be called, ',
    async (): Promise<void> => {
      const forceFetch: boolean = true;
      const setSpy1 = jest.spyOn(HttpClient, 'fetchUsers');
      const setSpy2 = jest.spyOn(cacheUsersProto.constructor, 'setUsersToAsyncStorage');
      const setSpy3 = jest.spyOn(cacheUsersProto.constructor, 'setTTL');
      await cacheUsersProto.constructor.getUsersRoutine(forceFetch);

      expect(setSpy1).toBeCalled();
      expect(setSpy2).toBeCalled();
      expect(setSpy3).toBeCalled();
      setSpy1.mockClear();
      setSpy2.mockClear();
      setSpy3.mockClear();
    });

  test('check CacheUsers.getUsersFromAsyncStorage to be called, when CacheUsers.getUsersRoutine is called SECOND+ time',
    async (): Promise<void> => {
      const setSpy = jest.spyOn(cacheUsersProto.constructor, 'getUsersFromAsyncStorage');
      await cacheUsersProto.constructor.getUsersRoutine();

      expect(setSpy).toBeCalled();
      setSpy.mockClear();
    });
});

describe('CacheUsers: check CacheUsers.isTTLExpired when AS returns expired TTL', (): void => {
  const cacheUsers: CacheUsers = new CacheUsers();
  const cacheUsersProto = Object.getPrototypeOf(cacheUsers); // To access private and protected static methods

  beforeAll(async (): Promise<void> => {
    await AsyncStorage.clear();
  });

  test('check CacheUsers.isTTLExpired return "true" when TTL from AS is expired',
    async (): Promise<void> => {
      // Set expired TTL to AsyncStorage
      const expiredTtlStamp: string = (Date.now() as number - 100).toString();
      await AsyncStorage.setItem(ASKeys.Ttl, expiredTtlStamp);

      const isTTLExpired: boolean = await cacheUsersProto.constructor.isTTLExpired();

      expect(isTTLExpired).toEqual(true);
    });
});
