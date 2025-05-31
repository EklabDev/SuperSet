import { SuperSet } from '../src/SuperSet';

describe('SuperSet', () => {
  describe('static from', () => {
    it('should create SuperSet from native Set', () => {
      const set = new Set([1, 2, 3]);
      const superSet = SuperSet.from(set);
      expect(superSet).toBeInstanceOf(SuperSet);
      expect([...superSet]).toEqual([1, 2, 3]);
    });

    it('should create SuperSet from SuperSet', () => {
      const superSet1 = new SuperSet([1, 2, 3]);
      const superSet2 = SuperSet.from(superSet1);
      expect(superSet2).toBeInstanceOf(SuperSet);
      expect([...superSet2]).toEqual([1, 2, 3]);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty set', () => {
      const set = new SuperSet<number>();
      expect(set.isEmpty()).toBe(true);
    });

    it('should return false for non-empty set', () => {
      const set = new SuperSet([1, 2, 3]);
      expect(set.isEmpty()).toBe(false);
    });
  });

  describe('union', () => {
    it('should combine two sets', () => {
      const set1 = new SuperSet([1, 2, 3]);
      const set2 = new SuperSet([3, 4, 5]);
      const union = set1.union(set2);
      expect([...union]).toEqual([1, 2, 3, 4, 5]);
    });

    it('should work with native Set', () => {
      const set1 = new SuperSet([1, 2, 3]);
      const set2 = new Set([3, 4, 5]);
      const union = set1.union(set2);
      expect([...union]).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('intersection', () => {
    it('should return common elements', () => {
      const set1 = new SuperSet([1, 2, 3]);
      const set2 = new SuperSet([2, 3, 4]);
      const intersection = set1.intersection(set2);
      expect([...intersection]).toEqual([2, 3]);
    });

    it('should return empty set for no common elements', () => {
      const set1 = new SuperSet([1, 2, 3]);
      const set2 = new SuperSet([4, 5, 6]);
      const intersection = set1.intersection(set2);
      expect([...intersection]).toEqual([]);
    });
  });

  describe('subtract', () => {
    it('should remove elements present in other set', () => {
      const set1 = new SuperSet([1, 2, 3, 4]);
      const set2 = new SuperSet([2, 4]);
      const difference = set1.subtract(set2);
      expect([...difference]).toEqual([1, 3]);
    });
  });

  describe('isIntersectionOf', () => {
    it('should return true for valid intersection', () => {
      const set1 = new SuperSet([2, 3]);
      const set2 = new SuperSet([1, 2, 3]);
      const set3 = new SuperSet([2, 3, 4]);
      expect(set1.isIntersectionOf(set2, set3)).toBe(true);
    });

    it('should return false for invalid intersection', () => {
      const set1 = new SuperSet([2, 3, 5]);
      const set2 = new SuperSet([1, 2, 3]);
      const set3 = new SuperSet([2, 3, 4]);
      expect(set1.isIntersectionOf(set2, set3)).toBe(false);
    });
  });

  describe('isUnionOf', () => {
    it('should return true for valid union', () => {
      const set1 = new SuperSet([1, 2, 3, 4]);
      const set2 = new SuperSet([1, 2]);
      const set3 = new SuperSet([3, 4]);
      expect(set1.isUnionOf(set2, set3)).toBe(true);
    });

    it('should return false for invalid union', () => {
      const set1 = new SuperSet([1, 2, 3, 4, 5]);
      const set2 = new SuperSet([1, 2]);
      const set3 = new SuperSet([3, 4]);
      expect(set1.isUnionOf(set2, set3)).toBe(false);
    });
  });

  describe('isSubset', () => {
    it('should return true for subset', () => {
      const set1 = new SuperSet([1, 2]);
      const set2 = new SuperSet([1, 2, 3, 4]);
      expect(set1.isSubset(set2)).toBe(true);
    });

    it('should return false for non-subset', () => {
      const set1 = new SuperSet([1, 2, 5]);
      const set2 = new SuperSet([1, 2, 3, 4]);
      expect(set1.isSubset(set2)).toBe(false);
    });
  });

  describe('isSuperSet', () => {
    it('should return true for superset', () => {
      const set1 = new SuperSet([1, 2, 3, 4]);
      const set2 = new SuperSet([1, 2]);
      expect(set1.isSuperSet(set2)).toBe(true);
    });

    it('should return false for non-superset', () => {
      const set1 = new SuperSet([1, 2, 3]);
      const set2 = new SuperSet([1, 2, 4]);
      expect(set1.isSuperSet(set2)).toBe(false);
    });
  });

  describe('isDisjoint', () => {
    it('should return true for disjoint sets', () => {
      const set1 = new SuperSet([1, 2, 3]);
      const set2 = new SuperSet([4, 5, 6]);
      expect(set1.isDisjoint(set2)).toBe(true);
    });

    it('should return false for non-disjoint sets', () => {
      const set1 = new SuperSet([1, 2, 3]);
      const set2 = new SuperSet([3, 4, 5]);
      expect(set1.isDisjoint(set2)).toBe(false);
    });
  });

  describe('some', () => {
    it('should return true if any element satisfies predicate', () => {
      const set = new SuperSet([1, 2, 3, 4]);
      expect(set.some(x => x > 3)).toBe(true);
    });

    it('should return false if no element satisfies predicate', () => {
      const set = new SuperSet([1, 2, 3, 4]);
      expect(set.some(x => x > 4)).toBe(false);
    });
  });

  describe('every', () => {
    it('should return true if all elements satisfy predicate', () => {
      const set = new SuperSet([2, 4, 6, 8]);
      expect(set.every(x => x % 2 === 0)).toBe(true);
    });

    it('should return false if any element does not satisfy predicate', () => {
      const set = new SuperSet([2, 4, 5, 8]);
      expect(set.every(x => x % 2 === 0)).toBe(false);
    });
  });

  describe('map', () => {
    it('should transform all elements', () => {
      const set = new SuperSet([1, 2, 3]);
      const mapped = set.map(x => x * 2);
      expect([...mapped]).toEqual([2, 4, 6]);
    });
  });

  describe('filter', () => {
    it('should filter elements based on predicate', () => {
      const set = new SuperSet([1, 2, 3, 4, 5]);
      const filtered = set.filter(x => x % 2 === 0);
      expect([...filtered]).toEqual([2, 4]);
    });
  });

  describe('reduce', () => {
    it('should reduce set to single value', () => {
      const set = new SuperSet([1, 2, 3, 4]);
      const sum = set.reduce((acc, x) => acc + x, 0);
      expect(sum).toBe(10);
    });
  });

  describe('conversion methods', () => {
    it('should convert to array', () => {
      const set = new SuperSet([1, 2, 3]);
      const array = set.toArray();
      expect(Array.isArray(array)).toBe(true);
      expect(array).toEqual([1, 2, 3]);
    });

    it('should convert to native Set', () => {
      const set = new SuperSet([1, 2, 3]);
      const nativeSet = set.toSet();
      expect(nativeSet).toBeInstanceOf(Set);
      expect([...nativeSet]).toEqual([1, 2, 3]);
    });
  });
}); 