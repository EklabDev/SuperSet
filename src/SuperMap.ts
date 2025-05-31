import { SuperSet } from './SuperSet';
import { MapLike, MapPredicate, MapReducer } from './types';

/**
 * Enhanced Map implementation with additional utility methods
 */
export class SuperMap<K, V> extends Map<K, V> {
  /**
   * Creates a new SuperMap from a Map or SuperMap
   * @param map The source map to convert
   * @returns A new SuperMap instance
   */
  static from<K, V>(map: MapLike<K, V>): SuperMap<K, V> {
    return new SuperMap<K, V>(map);
  }

  /**
   * Checks if the map is empty
   * @returns true if the map has no entries
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Returns a new SuperMap containing all entries from both maps
   * Later values override earlier ones
   * @param map The map to union with
   * @returns A new SuperMap containing all entries
   */
  union(map: MapLike<K, V>): SuperMap<K, V> {
    return new SuperMap<K, V>([...this, ...map]);
  }

  /**
   * Returns a new SuperMap containing only entries with keys present in both maps
   * @param map The map to intersect with
   * @returns A new SuperMap containing common entries
   */
  intersection(map: MapLike<K, V>): SuperMap<K, V> {
    return new SuperMap<K, V>(
      [...this].filter(([key]) => map.has(key))
    );
  }

  /**
   * Returns a new SuperMap containing entries from this map that are not in the other map
   * @param map The map to subtract
   * @returns A new SuperMap containing remaining entries
   */
  subtract(map: MapLike<K, V>): SuperMap<K, V> {
    return new SuperMap<K, V>(
      [...this].filter(([key]) => !map.has(key))
    );
  }

  /**
   * Checks if this map is the intersection of all provided maps
   * @param maps The maps to check against
   * @returns true if this map is the intersection of all maps
   */
  isIntersectionOf(...maps: MapLike<K, V>[]): boolean {
    const intersection = maps.reduce((acc, map) => 
      new SuperMap<K, V>([...acc].filter(([key]) => map.has(key))), this);
    return this.size === intersection.size && 
      [...this].every(([key, value]) => 
        intersection.has(key) && intersection.get(key) === value);
  }

  /**
   * Checks if this map is the union of all provided maps
   * @param maps The maps to check against
   * @returns true if this map is the union of all maps
   */
  isUnionOf(...maps: MapLike<K, V>[]): boolean {
    const union = maps.reduce((acc, map) => 
      new SuperMap<K, V>([...acc, ...map]), new SuperMap<K, V>());
    return this.size === union.size && 
      [...this].every(([key, value]) => 
        union.has(key) && union.get(key) === value);
  }

  /**
   * Checks if this map's keys are a subset of the provided map's keys
   * @param map The map to check against
   * @returns true if this map's keys are a subset
   */
  isSubset(map: MapLike<K, V>): boolean {
    return [...this.keys()].every(key => map.has(key));
  }

  /**
   * Checks if this map's keys are a superset of the provided map's keys
   * @param map The map to check against
   * @returns true if this map's keys are a superset
   */
  isSuperSet(map: MapLike<K, V>): boolean {
    return [...map.keys()].every(key => this.has(key));
  }

  /**
   * Checks if this map has no keys in common with the provided map
   * @param map The map to check against
   * @returns true if the maps are disjoint
   */
  isDisjoint(map: MapLike<K, V>): boolean {
    return [...this.keys()].every(key => !map.has(key));
  }

  /**
   * Checks if any entry satisfies the predicate
   * @param predicate The function to test each entry
   * @returns true if any entry satisfies the predicate
   */
  some(predicate: MapPredicate<K, V>): boolean {
    return [...this].some(([key, value]) => predicate(value, key));
  }

  /**
   * Checks if all entries satisfy the predicate
   * @param predicate The function to test each entry
   * @returns true if all entries satisfy the predicate
   */
  every(predicate: MapPredicate<K, V>): boolean {
    return [...this].every(([key, value]) => predicate(value, key));
  }

  /**
   * Transforms each key using the provided function while preserving values
   * @param mapper The function to transform each key
   * @returns A new SuperMap with transformed keys
   */
  mapKeys<U>(mapper: (key: K, value: V) => U): SuperMap<U, V> {
    return new SuperMap<U, V>([...this].map(([key, value]) => [mapper(key, value), value]));
  }

  /**
   * Transforms each value using the provided function while preserving keys
   * @param mapper The function to transform each value
   * @returns A new SuperMap with transformed values
   */
  mapValues<U>(mapper: (value: V, key: K) => U): SuperMap<K, U> {
    return new SuperMap<K, U>([...this].map(([key, value]) => [key, mapper(value, key)]));
  }

  /**
   * Filters entries based on the predicate
   * @param predicate The function to test each entry
   * @returns A new SuperMap containing filtered entries
   */
  filter(predicate: MapPredicate<K, V>): SuperMap<K, V> {
    return new SuperMap<K, V>(
      [...this].filter(([key, value]) => predicate(value, key))
    );
  }

  /**
   * Reduces the map to a single value
   * @param reducer The function to reduce entries
   * @param initialValue The initial value for reduction
   * @returns The reduced value
   */
  reduce<U>(reducer: MapReducer<K, V, U>, initialValue: U): U {
    return [...this].reduce(
      (acc, [key, value]) => reducer(acc, value, key),
      initialValue
    );
  }

  /**
   * Checks if the map contains the specified key
   * @param key The key to check for
   * @returns true if the key exists in the map
   */
  includesKey(key: K): boolean {
    return this.has(key);
  }

  /**
   * Checks if the map contains the specified value
   * @param value The value to check for
   * @returns true if the value exists in the map
   */
  includesValue(value: V): boolean {
    return [...this.values()].includes(value);
  }

  valuesToSet(): SuperSet<V> {
    return new SuperSet<V>([...this.values()]);
  }

  keysToSet(): SuperSet<K> {
    return new SuperSet<K>([...this.keys()]);
  }

  entriesToSet(): SuperSet<[K, V]> {
    return new SuperSet<[K, V]>([...this.entries()]);
  }

  valuesToArray(): V[] {
    return [...this.values()];
  }

  keysToArray(): K[] {
    return [...this.keys()];
  }
  toMap(): Map<K, V> {
    return new Map<K, V>([...this.entries()]);
  }

} 