import { describe, it, expect } from "vitest";
import { setToArray } from "./set";

describe(setToArray.name, () => {
  it("should convert a set of numbers to an array", () => {
    const set = new Set([1, 2, 3]);
    const result = setToArray(set);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should convert a set of strings to an array", () => {
    const set = new Set(["a", "b", "c"]);
    const result = setToArray(set);
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("should return an empty array when the set is empty", () => {
    const set = new Set();
    const result = setToArray(set);
    expect(result).toEqual([]);
  });

  it("should convert a set of objects to an array", () => {
    const set = new Set([{ id: 1 }, { id: 2 }]);
    const result = setToArray(set);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("should maintain the order of elements", () => {
    const set = new Set([3, 2, 1]);
    const result = setToArray(set);
    expect(result).toEqual([3, 2, 1]);
  });
});
