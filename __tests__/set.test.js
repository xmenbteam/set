const Set = require("../set");

describe("set", () => {
  test("returns an object", () => {
    const testSet = Set();
    expect(typeof testSet).toBe("object");
  });
  describe("properties", () => {
    describe("size", () => {
      test("Size = 0 on instantiation", () => {
        const testSet = Set();
        expect(testSet.size).toBe(0);
      });
      test("Size === store.length", () => {
        const testSet = Set();
        expect(testSet.size).toBe(0);
        const items = ["a", "b"];
        testSet.add(items);
        expect(testSet.size).toBe(2);
      });
    });
    describe("store", () => {
      test("Store is an empty object", () => {
        const testSet = Set();
        expect(testSet.store).toEqual({});
      });
    });
  });
  describe("methods", () => {
    describe("add", () => {
      test("single item is pushed into storage", () => {
        const item = "a";
        const store = { 0: "a" };
        const testSet = Set();
        testSet.add(item);
        expect(testSet.store).toEqual(store);
      });
      test("multiple items are pushed into storage", () => {
        const items = ["a", "b"];
        const store = { 0: "a", 1: "b" };
        const testSet = Set();
        testSet.add(items);
        expect(testSet.store).toEqual(store);
      });
      test("single individual items are pushed into storage", () => {
        const input = ["a", "a"];
        const store = { 0: "a" };
        const testSet = Set();
        const add = testSet.add(input);
        expect(testSet.store).toEqual(store);
        expect(testSet.store).toEqual(add);
      });
      test("multiple individual items are pushed into storage", () => {
        const input = ["a", "a", "b", "b", "c", "a", "c"];
        const store = { 0: "a", 1: "b", 2: "c" };
        const testSet = Set();
        const add = testSet.add(input);
        expect(testSet.store).toEqual(store);
        expect(testSet.size).toEqual(3);
        expect(testSet.store).toEqual(add);
      });
      test("multiple invocations - items are pushed into storage", () => {
        const inputOne = ["a", "a", "b", "b", "c", "a", "c"];
        const inputTwo = ["d", "a"];
        const storeOne = { 0: "a", 1: "b", 2: "c", 3: "d" };
        const testSet = Set();
        testSet.add(inputOne);
        expect(testSet.size).toEqual(3);
        testSet.add(inputTwo);

        expect(testSet.store).toEqual(storeOne);
        expect(testSet.size).toEqual(4);
      });
    });
    describe("values", () => {
      test("returns an empty array", () => {
        const testSet = Set();
        const values = testSet.values();
        expect(values).toEqual([]);
      });
      test("returns values", () => {
        const testSet = Set();
        const input = ["a", "a", "b", "b", "c", "a", "c"];
        const expected = ["a", "b", "c"];
        testSet.add(input);
        const values = testSet.values();
        expect(values).toEqual(expected);
      });
    });
    describe("entries", () => {
      test("returns an empty array", () => {
        const testSet = Set();
        const values = testSet.values();
        expect(values).toEqual([]);
      });
      test("returns entries", () => {
        const testSet = Set();
        const input = ["a", "a", "b", "b", "c", "a", "c"];
        const expected = [
          ["0", "a"],
          ["1", "b"],
          ["2", "c"],
        ];
        testSet.add(input);
        const values = testSet.entries();
        expect(values).toEqual(expected);
      });
    });
    describe("clear", () => {
      test("Clears store", () => {
        const item = "a";
        const store = { 0: "a" };
        const testSet = Set();
        testSet.add(item);
        expect(testSet.store).toEqual(store);
        expect(testSet.size).toEqual(1);
        testSet.clear();
        expect(testSet.store).toEqual({});
        expect(testSet.size).toEqual(0);
      });
    });
    describe("forEach", () => {
      test("Applies function to single element", () => {
        const mockUpper = jest.fn((e) => e.toUpperCase());
        const item = "a";
        const upperStore = { 0: "A" };
        const testSet = Set();
        testSet.add(item);
        testSet.forEach(mockUpper);
        expect(mockUpper).toHaveBeenCalledTimes(1);
        expect(testSet.store).toEqual(upperStore);
      });
      test("Applies function to each element in the set", () => {
        const mockUpper = jest.fn((e) => e * 2);
        const item = [2, 4, 6];
        const upperStore = { 0: 4, 1: 8, 2: 12 };
        const testSet = Set();
        testSet.add(item);
        testSet.forEach(mockUpper);
        expect(mockUpper).toHaveBeenCalledTimes(3);
        expect(testSet.store).toEqual(upperStore);
      });
    });
    describe("remove", () => {
      test("removes single item", () => {
        const item = "a";
        const store = { 0: "a" };
        const testSet = Set();
        testSet.add(item);
        expect(testSet.store).toEqual(store);
        testSet.remove(item);
        expect(testSet.store).toEqual({});
      });
      test("removes item from longer set", () => {
        const itemsToAdd = ["a", "b", "c"];
        const store = { 0: "a", 1: "b", 2: "c" };
        const newStore = { 0: "b", 1: "c" };
        const testSet = Set();
        testSet.add(itemsToAdd);
        expect(testSet.store).toEqual(store);
        testSet.remove("a");
        expect(testSet.store).toEqual(newStore);
      });
    });
    describe("has", () => {
      test("Returns false if item is not present in store", () => {
        const items = ["a", "b"];
        const testSet = Set();
        testSet.add(items);
        expect(testSet.has("s")).toBe(false);
      });
      test("Returns true if item is present in store", () => {
        const items = ["a", "b"];
        const testSet = Set();
        testSet.add(items);
        expect(testSet.has("a")).toBe(true);
      });
    });
  });
});
