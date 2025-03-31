import { describe, test, expect } from "vitest";
import { findProductImage } from "./findProductImage";

describe("Find the correct image depending on name and sometimes in special cases where brand is the only thing that separates them", () => {
  test("Should return the correct image path for the product", () => {
    // Given a product name and brand
    const name = "Playstation 4";
    const brand = "Sony";

    // When calling findProductImage
    const result = findProductImage(name, brand);

    // Then it should return the correct image path
    expect(result).toBe("/Products/playstation-4.png");
  });

  test("Should return the correct image even if there are duplicates with same name", () => {
    // Given a Bluetooth speaker from JBL that has the same name as another product.
    const name = "Bluetooth Speaker";
    const brand = "JBL";

    // When calling findProductImage
    const result = findProductImage(name, brand);

    // Then it should return the correct image path
    expect(result).toBe("/Products/bluetooth-speaker-jbl.png");
  });

  test("Should return the correct image even if there are duplicate products with the same name", () => {
    // Given a Bluetooth speaker from Marshall
    const name = "Bluetooth Speaker";
    const brand = "Marshall";

    // When calling findProductImage
    const result = findProductImage(name, brand);

    // Then it should return the correct image path
    expect(result).toBe("/Products/bluetooth-speaker-marshall.png");
  });

  test("Should return null for a product, that is not included", () => {
    // Given a product name and brand not included
    const name = "Wireless mouse";
    const brand = "Logitech";

    // When calling findProductImage
    const result = findProductImage(name, brand);

    // Then it should return null
    expect(result).toBeNull();
  });

  test("Should handle case sensitivity", () => {
    // Given a product name and brand with different upper case letters.
    const name = "Samsung 40 UHD Smart TV";
    const brand = "SAMSUNG";

    // When calling findProductImage
    const result = findProductImage(name, brand);

    // Then it should return the correct image path
    expect(result).toBe("/Products/smart-uhd-tv.png");
  });
});
