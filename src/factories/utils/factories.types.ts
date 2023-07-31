import { BaseEntity, Collection } from '@mikro-orm/core';
import { ExcludeFunctions } from '@mikro-orm/core/typings';
import { BaseFactory } from '../base.factory';

export type Nested<T> = T extends BaseEntity<any, any, any> ? T | Properties<T> : T;

export type PropertyItem<T> = T extends Collection<infer U, any> ? (U | Nested<U>)[] : Nested<T>;
export type ProcessedPropertyItem<T> = T extends Collection<infer U, any> ? (Properties<U> | U)[] : T;
export type Properties<T> = {
  [K in keyof T as ExcludeFunctions<T, K>]?: PropertyItem<T[K]>;
};

export type ProcessedProperties<T> = {
  [K in keyof T as ExcludeFunctions<T, K>]?: ProcessedPropertyItem<T[K]>;
};

export type ManyRelatedProperties<T> = {
  [K in keyof T as OnlyCollectionProperties<T, K>]?: PropertyItem<T[K]>;
};
export type OnlyForeignKeyProperties<T, K extends keyof T> = T[K] extends BaseEntity<any, any, any> ? K : never;
export type OnlyCollectionProperties<T, K extends keyof T> = T[K] extends Collection<infer U, any>
  ? K extends symbol
    ? never
    : K
  : never;

export type FactoryConstructor = new (...args: any) => BaseFactory<any>;
