import { SetLike, SetPredicate, SetMapper, SetReducer } from './types';

/**
 * Enhanced Set implementation with additional utility methods
 */
export class SuperSet<T> extends Set<T> {
  /**
   * Creates a new SuperSet from a Set or SuperSet
   * @param set The source set to convert
   * @returns A new SuperSet instance
   */
  static from<T>(set: SetLike<T>): SuperSet<T> {
    return new SuperSet<T>(set);
  }

  /**
   * Checks if the set is empty
   * @returns true if the set has no elements
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Returns a new SuperSet containing all elements from both sets
   * @param set The set to union with
   * @returns A new SuperSet containing all elements
   */
  union(set: SetLike<T>): SuperSet<T> {
    return new SuperSet<T>([...this, ...set]);
  }

  /**
   * Returns a new SuperSet containing only elements present in both sets
   * @param set The set to intersect with
   * @returns A new SuperSet containing common elements
   */
  intersection(set: SetLike<T>): SuperSet<T> {
    return new SuperSet<T>([...this].filter(x => set.has(x)));
  }

  /**
   * Returns a new SuperSet containing elements from this set that are not in the other set
   * @param set The set to subtract
   * @returns A new SuperSet containing remaining elements
   */
  subtract(set: SetLike<T>): SuperSet<T> {
    return new SuperSet<T>([...this].filter(x => !set.has(x)));
  }

  /**
   * Checks if this set is the intersection of all provided sets
   * @param sets The sets to check against
   * @returns true if this set is the intersection of all sets
   */
  isIntersectionOf(...sets: SetLike<T>[]): boolean {
    const intersection = sets.reduce((acc, set) => 
      new SuperSet<T>([...acc].filter(x => set.has(x))), this);
    return this.size === intersection.size && 
      [...this].every(x => intersection.has(x));
  }

  /**
   * Checks if this set is the union of all provided sets
   * @param sets The sets to check against
   * @returns true if this set is the union of all sets
   */
  isUnionOf(...sets: SetLike<T>[]): boolean {
    const union = sets.reduce((acc, set) => 
      new SuperSet<T>([...acc, ...set]), new SuperSet<T>());
    return this.size === union.size && 
      [...this].every(x => union.has(x));
  }

  /**
   * Checks if this set is a subset of the provided set
   * @param set The set to check against
   * @returns true if this set is a subset
   */
  isSubset(set: SetLike<T>): boolean {
    return [...this].every(x => set.has(x));
  }

  /**
   * Checks if this set is a superset of the provided set
   * @param set The set to check against
   * @returns true if this set is a superset
   */
  isSuperSet(set: SetLike<T>): boolean {
    return [...set].every(x => this.has(x));
  }

  /**
   * Checks if this set has no elements in common with the provided set
   * @param set The set to check against
   * @returns true if the sets are disjoint
   */
  isDisjoint(set: SetLike<T>): boolean {
    return [...this].every(x => !set.has(x));
  }

  /**
   * Checks if any element satisfies the predicate
   * @param predicate The function to test each element
   * @returns true if any element satisfies the predicate
   */
  some(predicate: SetPredicate<T>): boolean {
    return [...this].some(predicate);
  }

  /**
   * Checks if all elements satisfy the predicate
   * @param predicate The function to test each element
   * @returns true if all elements satisfy the predicate
   */
  every(predicate: SetPredicate<T>): boolean {
    return [...this].every(predicate);
  }

  /**
   * Transforms each element using the provided function
   * @param mapper The function to transform each element
   * @returns A new SuperSet with transformed elements
   */
  map<U>(mapper: SetMapper<T, U>): SuperSet<U> {
    return new SuperSet<U>([...this].map(mapper));
  }

  /**
   * Filters elements based on the predicate
   * @param predicate The function to test each element
   * @returns A new SuperSet containing filtered elements
   */
  filter(predicate: SetPredicate<T>): SuperSet<T> {
    return new SuperSet<T>([...this].filter(predicate));
  }

  /**
   * Reduces the set to a single value
   * @param reducer The function to reduce elements
   * @param initialValue The initial value for reduction
   * @returns The reduced value
   */
  reduce<U>(reducer: SetReducer<T, U>, initialValue: U): U {
    return [...this].reduce(reducer, initialValue);
  }

  toArray(): T[] {
    return [...this];
  }

  toSet(): Set<T> {
    return new Set<T>([...this]);
  }
  
} 