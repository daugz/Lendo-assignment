import { describe, test, expect, vi } from "vitest";
import { findColor } from "./findColor";

vi.mock("./styles.module.css", () => ({
  default: {
    red: "red",
    white: "white",
    green: "green",
    black: "black",
    orange: "orange",
  },
}));

describe("findColor", () => {
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
