import { describe, test, expect } from "vitest";
import { findColor } from "./findColor";

describe("Find the color and return a css-class", () => {
  test("Should return the correct class when a valid color is given", () => {
    // Given a valid color
    const color = "white";

    // When calling findColor
    const result = findColor(color);

    // Then it should return the correct class
    expect(result).toMatch(/^_white_/);
  });

  test("Should return null when an invalid color is given", () => {
    // Given a color not in the list
    const color = "purple";

    // When calling findColor
    const result = findColor(color);

    // Then it should return null
    expect(result).toBeNull();
  });
});
