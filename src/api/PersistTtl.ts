import AsyncStorage from '@react-native-async-storage/async-storage';
import { EASKeys } from '../types/shared.types';

export class PersistTtl {
  static readonly #ttlKey: string = EASKeys.Ttl;

  private static getTTLStampValue(): string {
    const cacheExpirationTimeout: number = 3600000; // 60 * 60 * 1000 = 1 hour;
    const now: number = Date.now();

    return (now + cacheExpirationTimeout).toString();
  }

  public static async getTTL(): Promise<number | null> {
    try {
      const ttlASValue: string | null = await AsyncStorage.getItem(PersistTtl.#ttlKey);
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
      await AsyncStorage.setItem(PersistTtl.#ttlKey, PersistTtl.getTTLStampValue());
    } catch (e: unknown) {
    }
  }

  protected static async isTTLExpired(): Promise<boolean> {
    const now: number = Date.now();
    const ttlStamp: number = await PersistTtl.getTTL();

    return Promise.resolve(now > ttlStamp);
  }
}
