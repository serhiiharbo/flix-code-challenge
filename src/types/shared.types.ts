import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { User } from '../api/HttpClient';

export type TStyle = {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
};

export enum EOrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum ESort {
  sortBy = 'sortBy',
  orderBy = 'orderBy',
}

export type TSort = {
  [ESort.sortBy]?: keyof User | undefined,
  [ESort.orderBy]?: keyof typeof EOrderBy | undefined,
}

export type TColumns = [keyof User];

export enum EASKeys {
  Ttl = 'Ttl',
  Users = 'Users',
}
