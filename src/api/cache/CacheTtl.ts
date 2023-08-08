import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASKeys } from '../constants';

export class CacheTtl {
  static readonly #ttlKey: string = ASKeys.Ttl;

  // TODO: store ttl number in the instance to access it without AS
  // #ttlValueInStore: number;

  private static getTTLStampValue(): string {
    const cacheExpirationTimeout: number = 3600000; // 60 * 60 * 1000 = 1 hour;
    const now: number = Date.now();

    return (now + cacheExpirationTimeout).toString();
  }

  public static async getTTL(): Promise<number | null> {
    try {
      const ttlASValue: string | null = await AsyncStorage.getItem(CacheTtl.#ttlKey);
      const ttlStamp: number = ttlASValue ? Number(ttlASValue) : null;

      return Promise.resolve(ttlStamp);
    } catch (e: unknown) {
      return Promise.resolve(null);
    }
  }

  /**
   * Sets new TTL value that expires 1 hour from now
   * */
  protected static async setTTL(): Promise<void> {
    try {
      await AsyncStorage.setItem(CacheTtl.#ttlKey, CacheTtl.getTTLStampValue());
    } catch (e: unknown) {
    }
  }

  protected static async isTTLExpired(): Promise<boolean> {
    const now: number = Date.now();
    const ttlStamp: number = await CacheTtl.getTTL();

    return Promise.resolve(now > ttlStamp);
  }
}
