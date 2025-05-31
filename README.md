# @eklabdev/superset

Enhanced Set and Map implementations with additional utility methods for advanced set operations and functional programming patterns.

## Installation

```bash
npm install @eklabdev/superset
```

## Features

- Full TypeScript support with type safety
- Extends native Set and Map with additional utility methods
- Immutable operations that return new instances
- Functional programming patterns (map, filter, reduce)
- Advanced set operations (union, intersection, subtraction)
- Comprehensive type definitions
- Zero dependencies
- ES2015+ compatible

## Usage

### SuperSet

```typescript
import { SuperSet } from '@eklabdev/superset';

// Create a new SuperSet
const set1 = new SuperSet([1, 2, 3]);
const set2 = SuperSet.from(new Set([3, 4, 5]));

// Basic operations
const union = set1.union(set2); // SuperSet {1, 2, 3, 4, 5}
const intersection = set1.intersection(set2); // SuperSet {3}
const difference = set1.subtract(set2); // SuperSet {1, 2}

// Functional operations
const doubled = set1.map(x => x * 2); // SuperSet {2, 4, 6}
const evenNumbers = set1.filter(x => x % 2 === 0); // SuperSet {2}
const sum = set1.reduce((acc, x) => acc + x, 0); // 6

// Set relations
const isSubset = set1.isSubset(new Set([1, 2, 3, 4])); // true
const isSuperSet = set1.isSuperSet(new Set([1, 2])); // true
const isDisjoint = set1.isDisjoint(new Set([4, 5, 6])); // true
```

### SuperMap

```typescript
import { SuperMap } from '@eklabdev/superset';

// Create a new SuperMap
const map1 = new SuperMap([['a', 1], ['b', 2]]);
const map2 = SuperMap.from(new Map([['b', 3], ['c', 4]]));

// Basic operations
const union = map1.union(map2); // SuperMap {a: 1, b: 3, c: 4}
const intersection = map1.intersection(map2); // SuperMap {b: 2}
const difference = map1.subtract(map2); // SuperMap {a: 1}

// Functional operations
const doubled = map1.map((value, key) => value * 2); // SuperSet {2, 4}
const evenValues = map1.filter((value) => value % 2 === 0); // SuperMap {b: 2}
const sum = map1.reduce((acc, value) => acc + value, 0); // 3

// Map relations
const isSubset = map1.isSubset(new Map([['a', 1], ['b', 2], ['c', 3]])); // true
const isSuperSet = map1.isSuperSet(new Map([['a', 1]])); // true
const isDisjoint = map1.isDisjoint(new Map([['c', 3], ['d', 4]])); // true

// Value checks
const hasKey = map1.includesKey('a'); // true
const hasValue = map1.includesValue(2); // true
```

## API Documentation

### SuperSet

#### Static Methods

- `static from<T>(set: Set<T> | SuperSet<T>): SuperSet<T>` - Convert native Set or SuperSet to SuperSet

#### Instance Methods

- `isEmpty(): boolean` - Check if set is empty
- `union(set: Set<T> | SuperSet<T>): SuperSet<T>` - Return new set combining both sets
- `intersection(set: Set<T> | SuperSet<T>): SuperSet<T>` - Return new set with common elements
- `subtract(set: Set<T> | SuperSet<T>): SuperSet<T>` - Return new set removing elements from other set
- `isIntersectionOf(...sets: (Set<T> | SuperSet<T>)[]): boolean` - Check if this set is intersection of all provided sets
- `isUnionOf(...sets: (Set<T> | SuperSet<T>)[]): boolean` - Check if this set is union of all provided sets
- `isSubset(set: Set<T> | SuperSet<T>): boolean` - Check if this set is subset of provided set
- `isSuperSet(set: Set<T> | SuperSet<T>): boolean` - Check if this set is superset of provided set
- `isDisjoint(set: Set<T> | SuperSet<T>): boolean` - Check if sets have no common elements
- `some(predicate: (value: T) => boolean): boolean` - Check if any element satisfies predicate
- `every(predicate: (value: T) => boolean): boolean` - Check if all elements satisfy predicate
- `map<U>(predicate: (value: T) => U): SuperSet<U>` - Transform elements and return new SuperSet
- `filter(predicate: (value: T) => boolean): SuperSet<T>` - Filter elements and return new SuperSet
- `reduce<U>(predicate: (accumulator: U, value: T) => U, initialValue: U): U` - Reduce set to single value
- `toArray(): T[]` - Convert to array
- `toSet(): Set<T>` - Convert to native Set

### SuperMap

#### Static Methods

- `static from<K, V>(map: Map<K, V> | SuperMap<K, V>): SuperMap<K, V>` - Convert native Map or SuperMap to SuperMap

#### Instance Methods

- `isEmpty(): boolean` - Check if map is empty
- `union(map: Map<K, V> | SuperMap<K, V>): SuperMap<K, V>` - Combine maps (later values override)
- `intersection(map: Map<K, V> | SuperMap<K, V>): SuperMap<K, V>` - Return map with common keys
- `subtract(map: Map<K, V> | SuperMap<K, V>): SuperMap<K, V>` - Remove keys present in other map
- `isIntersectionOf(...maps: (Map<K, V> | SuperMap<K, V>)[]): boolean` - Check if this map is intersection of all provided maps
- `isUnionOf(...maps: (Map<K, V> | SuperMap<K, V>)[]): boolean` - Check if this map is union of all provided maps
- `isSubset(map: Map<K, V> | SuperMap<K, V>): boolean` - Check if this map's keys are subset of provided map
- `isSuperSet(map: Map<K, V> | SuperMap<K, V>): boolean` - Check if this map's keys are superset of provided map
- `isDisjoint(map: Map<K, V> | SuperMap<K, V>): boolean` - Check if maps have no common keys
- `some(predicate: (value: V, key: K) => boolean): boolean` - Check if any entry satisfies predicate
- `every(predicate: (value: V, key: K) => boolean): boolean` - Check if all entries satisfy predicate
- `map<U>(predicate: (value: V, key: K) => U): SuperSet<U>` - Transform values and return SuperSet
- `filter(predicate: (value: V, key: K) => boolean): SuperMap<K, V>` - Filter entries and return new SuperMap
- `reduce<U>(predicate: (accumulator: U, value: V, key: K) => U, initialValue: U): U` - Reduce map to single value
- `includesKey(key: K): boolean` - Check if key exists in map
- `includesValue(value: V): boolean` - Check if value exists in map
- `valuesToSet(): SuperSet<V>` - Convert map values to SuperSet
- `keysToSet(): SuperSet<K>` - Convert map keys to SuperSet
- `entriesToSet(): SuperSet<[K, V]>` - Convert map entries to SuperSet
- `valuesToArray(): V[]` - Convert map values to array
- `keysToArray(): K[]` - Convert map keys to array
- `toMap(): Map<K, V>` - Convert to native Map

## Performance Considerations

- All operations that return new instances are immutable
- Set operations use efficient algorithms to minimize iterations
- Array spread operations are used for simplicity and readability
- For large sets/maps, consider using native Set/Map methods directly for better performance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 