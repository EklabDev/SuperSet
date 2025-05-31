import { SuperSet, SuperMap } from '../src';

describe('SuperSet and SuperMap Integration', () => {

  describe('SuperSet to SuperMap conversion', () => {
    it('should convert set elements to map entries', () => {
      const set = new SuperSet([1, 2, 3]);
      const map = new SuperMap(
        [...set].map((value, index) => [`key${index}`, value])
      );
      expect(map).toBeInstanceOf(SuperMap);
      expect([...map.values()]).toEqual([1, 2, 3]);
    });

    it('should handle empty set', () => {
      const set = new SuperSet<number>();
      const map = new SuperMap(
        [...set].map((value, index) => [`key${index}`, value])
      );
      expect(map).toBeInstanceOf(SuperMap);
      expect([...map.values()]).toEqual([]);
    });
  });

  describe('Complex operations', () => {
    it('should chain operations between SuperSet and SuperMap', () => {
      // Create initial data
      const map = new SuperMap([
        ['a', 1],
        ['b', 2],
        ['c', 3],
        ['d', 4],
        ['e', 5]
      ]);

      // Filter map to get even values
      const evenMap = map.filter((value) => value % 2 === 0);

      // Convert even values to a set
      const evenSet = evenMap.valuesToSet();

      // Double the values in the set
      const doubledSet = evenSet.map((value) => value * 2);

      // Convert back to map with new keys
      const resultMap = new SuperMap(
        doubledSet.toArray().map((value, index) => [`new${index}`, value])
      );

      // Verify results
      expect([...resultMap.values()]).toEqual([4, 8]);
      expect([...resultMap.keys()]).toEqual(['new0', 'new1']);
    });

    it('should handle complex set operations with map values', () => {
      // Create two maps
      const map1 = new SuperMap([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]);
      const map2 = new SuperMap([
        ['b', 2],
        ['c', 4],
        ['d', 5]
      ]);

      // Get sets of values
      const set1 = map1.valuesToSet();
      const set2 = map2.valuesToSet();

      // Perform set operations
      const union = set1.union(set2);
      const intersection = set1.intersection(set2);
      const difference = set1.subtract(set2);

      // Verify results
      expect([...union]).toEqual([1, 2, 3, 4, 5]);
      expect([...intersection]).toEqual([2]);
      expect([...difference]).toEqual([1, 3]);
    });
  });

  describe('Conversion operations', () => {
    it('should convert between SuperMap and SuperSet', () => {
      const map = new SuperMap([['a', 1], ['b', 2], ['c', 3]]);
      
      // Convert map values to set
      const valueSet = map.valuesToSet();
      expect(valueSet).toBeInstanceOf(SuperSet);
      expect([...valueSet]).toEqual([1, 2, 3]);

      // Convert set back to map
      const newMap = new SuperMap(
        [...valueSet].map((value, index) => [`key${index}`, value])
      );
      expect(newMap).toBeInstanceOf(SuperMap);
      expect([...newMap.values()]).toEqual([1, 2, 3]);
    });

    it('should handle empty collections in conversions', () => {
      const emptyMap = new SuperMap<string, number>();
      const emptySet = emptyMap.valuesToSet();
      expect(emptySet).toBeInstanceOf(SuperSet);
      expect([...emptySet]).toEqual([]);

      const nativeMap = emptyMap.toMap();
      expect(nativeMap).toBeInstanceOf(Map);
      expect([...nativeMap]).toEqual([]);
    });
  });
}); 