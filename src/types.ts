import { SuperMap } from "./SuperMap";
import { SuperSet } from "./SuperSet";

/**
 * Type for any Set-like object that can be used with SuperSet
 */
export type SetLike<T> = Set<T> | SuperSet<T>;

/**
 * Type for any Map-like object that can be used with SuperMap
 */
export type MapLike<K, V> = Map<K, V> | SuperMap<K, V>;

/**
 * Type for predicate functions used in SuperSet methods
 */
export type SetPredicate<T> = (value: T) => boolean;

/**
 * Type for predicate functions used in SuperMap methods
 */
export type MapPredicate<K, V> = (value: V, key: K) => boolean;

/**
 * Type for mapping functions used in SuperSet methods
 */
export type SetMapper<T, U> = (value: T) => U;

/**
 * Type for mapping functions used in SuperMap methods
 */
export type MapMapper<K, V, U> = (value: V, key: K) => U;

/**
 * Type for reducer functions used in SuperSet methods
 */
export type SetReducer<T, U> = (accumulator: U, value: T) => U;

/**
 * Type for reducer functions used in SuperMap methods
 */
export type MapReducer<K, V, U> = (accumulator: U, value: V, key: K) => U; 