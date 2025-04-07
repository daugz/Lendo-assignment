export const findProductImage = (
  name: string,
  brand: string
): string | null => {
  const fixedProductName = name
    .replace(/\s/g, "-")
    .replace("å", "a")
    .replace("ä", "a")
    .replace("ö", "o")
    .toLowerCase();
  const fixedProductBrand = brand
    .replace(/\s/g, "-")
    .replace("å", "a")
    .replace("ä", "a")
    .replace("ö", "o")
    .toLowerCase();

  const imageUrl = `/Products/${fixedProductName}-${fixedProductBrand}.png`;
  return imageUrl;
};
