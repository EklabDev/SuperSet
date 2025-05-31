import { SuperMap } from '../src/SuperMap';
import { SuperSet } from '../src/SuperSet';

describe('SuperMap', () => {
  describe('static from', () => {
    it('should create SuperMap from native Map', () => {
      const map = new Map([['a', 1], ['b', 2]]);
      const superMap = SuperMap.from(map);
      expect(superMap).toBeInstanceOf(SuperMap);
      expect([...superMap]).toEqual([['a', 1], ['b', 2]]);
    });

    it('should create SuperMap from SuperMap', () => {
      const superMap1 = new SuperMap([['a', 1], ['b', 2]]);
      const superMap2 = SuperMap.from(superMap1);
      expect(superMap2).toBeInstanceOf(SuperMap);
      expect([...superMap2]).toEqual([['a', 1], ['b', 2]]);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty map', () => {
      const map = new SuperMap<string, number>();
      expect(map.isEmpty()).toBe(true);
    });

    it('should return false for non-empty map', () => {
      const map = new SuperMap([['a', 1], ['b', 2]]);
      expect(map.isEmpty()).toBe(false);
    });
  });

  describe('union', () => {
    it('should combine two maps with later values overriding', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2]]);
      const map2 = new SuperMap([['b', 3], ['c', 4]]);
      const union = map1.union(map2);
      expect([...union]).toEqual([['a', 1], ['b', 3], ['c', 4]]);
    });

    it('should work with native Map', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2]]);
      const map2 = new Map([['b', 3], ['c', 4]]);
      const union = map1.union(map2);
      expect([...union]).toEqual([['a', 1], ['b', 3], ['c', 4]]);
    });
  });

  describe('intersection', () => {
    it('should return map with common keys', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const map2 = new SuperMap([['b', 2], ['c', 4], ['d', 5]]);
      const intersection = map1.intersection(map2);
      expect([...intersection]).toEqual([['b', 2], ['c', 3]]);
    });

    it('should return empty map for no common keys', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2]]);
      const map2 = new SuperMap([['c', 3], ['d', 4]]);
      const intersection = map1.intersection(map2);
      expect([...intersection]).toEqual([]);
    });
  });

  describe('subtract', () => {
    it('should remove keys present in other map', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const map2 = new SuperMap([['b', 2], ['c', 3]]);
      const difference = map1.subtract(map2);
      expect([...difference]).toEqual([['a', 1]]);
    });
  });

  describe('isIntersectionOf', () => {
    it('should return true for valid intersection', () => {
      const map1 = new SuperMap([['b', 2], ['c', 3]]);
      const map2 = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const map3 = new SuperMap([['b', 2], ['c', 3], ['d', 4]]);
      expect(map1.isIntersectionOf(map2, map3)).toBe(true);
    });

    it('should return false for invalid intersection', () => {
      const map1 = new SuperMap([['b', 2], ['c', 3], ['e', 5]]);
      const map2 = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const map3 = new SuperMap([['b', 2], ['c', 3], ['d', 4]]);
      expect(map1.isIntersectionOf(map2, map3)).toBe(false);
    });
  });

  describe('isUnionOf', () => {
    it('should return true for valid union', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2], ['c', 3], ['d', 4]]);
      const map2 = new SuperMap([['a', 1], ['b', 2]]);
      const map3 = new SuperMap([['c', 3], ['d', 4]]);
      expect(map1.isUnionOf(map2, map3)).toBe(true);
    });

    it('should return false for invalid union', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
      const map2 = new SuperMap([['a', 1], ['b', 2]]);
      const map3 = new SuperMap([['c', 3], ['d', 4]]);
      expect(map1.isUnionOf(map2, map3)).toBe(false);
    });
  });

  describe('isSubset', () => {
    it('should return true for subset', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2]]);
      const map2 = new SuperMap([['a', 1], ['b', 2], ['c', 3], ['d', 4]]);
      expect(map1.isSubset(map2)).toBe(true);
    });

    it('should return false for non-subset', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2], ['e', 5]]);
      const map2 = new SuperMap([['a', 1], ['b', 2], ['c', 3], ['d', 4]]);
      expect(map1.isSubset(map2)).toBe(false);
    });
  });

  describe('isSuperSet', () => {
    it('should return true for superset', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2], ['c', 3], ['d', 4]]);
      const map2 = new SuperMap([['a', 1], ['b', 2]]);
      expect(map1.isSuperSet(map2)).toBe(true);
    });

    it('should return false for non-superset', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const map2 = new SuperMap([['a', 1], ['b', 2], ['d', 4]]);
      expect(map1.isSuperSet(map2)).toBe(false);
    });
  });

  describe('isDisjoint', () => {
    it('should return true for disjoint maps', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const map2 = new SuperMap([['d', 4], ['e', 5], ['f', 6]]);
      expect(map1.isDisjoint(map2)).toBe(true);
    });

    it('should return false for non-disjoint maps', () => {
      const map1 = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const map2 = new SuperMap([['c', 3], ['d', 4], ['e', 5]]);
      expect(map1.isDisjoint(map2)).toBe(false);
    });
  });

  describe('some', () => {
    it('should return true if any entry satisfies predicate', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      expect(map.some((value, key) => value > 2)).toBe(true);
    });

    it('should return false if no entry satisfies predicate', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      expect(map.some((value, key) => value > 3)).toBe(false);
    });
  });

  describe('every', () => {
    it('should return true if all entries satisfy predicate', () => {
      const map = new SuperMap([['a', 2], ['b', 4], ['c', 6]]);
      expect(map.every((value, key) => value % 2 === 0)).toBe(true);
    });

    it('should return false if any entry does not satisfy predicate', () => {
      const map = new SuperMap([['a', 2], ['b', 4], ['c', 5]]);
      expect(map.every((value, key) => value % 2 === 0)).toBe(false);
    });
  });

  describe('filter', () => {
    it('should filter entries based on predicate', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3], ['d', 4]]);
      const filtered = map.filter((value, key) => value % 2 === 0);
      expect([...filtered]).toEqual([['b', 2], ['d', 4]]);
    });
  });

  describe('reduce', () => {
    it('should reduce map to single value', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3], ['d', 4]]);
      const sum = map.reduce((acc, value, key) => acc + value, 0);
      expect(sum).toBe(10);
    });
  });

  describe('includesKey', () => {
    it('should return true if key exists', () => {
      const map = new SuperMap([['a', 1], ['b', 2]]);
      expect(map.includesKey('a')).toBe(true);
    });

    it('should return false if key does not exist', () => {
      const map = new SuperMap([['a', 1], ['b', 2]]);
      expect(map.includesKey('c')).toBe(false);
    });
  });

  describe('includesValue', () => {
    it('should return true if value exists', () => {
      const map = new SuperMap([['a', 1], ['b', 2]]);
      expect(map.includesValue(2)).toBe(true);
    });

    it('should return false if value does not exist', () => {
      const map = new SuperMap([['a', 1], ['b', 2]]);
      expect(map.includesValue(3)).toBe(false);
    });
  });

  describe('mapValues', () => {
    it('should transform all values while preserving keys', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const mapped = map.mapValues((value, key) => value * 2);
      expect([...mapped]).toEqual([['a', 2], ['b', 4], ['c', 6]]);
    });

    it('should handle complex value transformations', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const mapped = map.mapValues((value, key) => `${key}:${value}`);
      expect([...mapped]).toEqual([['a', 'a:1'], ['b', 'b:2'], ['c', 'c:3']]);
    });
  });

  describe('mapKeys', () => {
    it('should transform all keys while preserving values', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const mapped = map.mapKeys((key, value) => key.toUpperCase());
      expect([...mapped]).toEqual([['A', 1], ['B', 2], ['C', 3]]);
    });

    it('should handle complex key transformations', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const mapped = map.mapKeys((key, value) => `${key}_${value}`);
      expect([...mapped]).toEqual([['a_1', 1], ['b_2', 2], ['c_3', 3]]);
    });
  });

  describe('conversion methods', () => {
    it('should convert values to SuperSet', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const set = map.valuesToSet();
      expect(set).toBeInstanceOf(SuperSet);
      expect([...set]).toEqual([1, 2, 3]);
    });

    it('should convert keys to SuperSet', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const set = map.keysToSet();
      expect(set).toBeInstanceOf(SuperSet);
      expect([...set]).toEqual(['a', 'b', 'c']);
    });

    it('should convert entries to SuperSet', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const set = map.entriesToSet();
      expect(set).toBeInstanceOf(SuperSet);
      expect([...set]).toEqual([['a', 1], ['b', 2], ['c', 3]]);
    });

    it('should convert values to array', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const array = map.valuesToArray();
      expect(Array.isArray(array)).toBe(true);
      expect(array).toEqual([1, 2, 3]);
    });

    it('should convert keys to array', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const array = map.keysToArray();
      expect(Array.isArray(array)).toBe(true);
      expect(array).toEqual(['a', 'b', 'c']);
    });

    it('should convert to native Map', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      const nativeMap = map.toMap();
      expect(nativeMap).toBeInstanceOf(Map);
      expect([...nativeMap]).toEqual([['a', 1], ['b', 2], ['c', 3]]);
    });
  });
}); 