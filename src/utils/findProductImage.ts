export const findProductImage = (
  name: string,
  brand: string
): string | null => {
  const assetProductsUrl = "/Products";

  const lowerCaseBrand = brand?.toLowerCase();
  const lowerCaseProductName = name?.toLowerCase();

  if (lowerCaseProductName === "philips hue bulb")
    return `${assetProductsUrl}/philips-hue.png`;
  if (lowerCaseProductName === "trådfria lampor")
    return `${assetProductsUrl}/tradfri.png`;
  if (lowerCaseProductName === "playstation 4")
    return `${assetProductsUrl}/playstation-4.png`;
  if (lowerCaseProductName === "nintendo switch")
    return `${assetProductsUrl}/nintendo-switch.png`;
  if (lowerCaseProductName === "bluetooth speaker")
    if (lowerCaseBrand === "jbl")
      return `${assetProductsUrl}/bluetooth-speaker-jbl.png`;
    else if (lowerCaseBrand === "marshall")
      return `${assetProductsUrl}/bluetooth-speaker-marshall.png`;
  if (lowerCaseProductName === "electrical toothbrush")
    return `${assetProductsUrl}/electrical-toothbrush.png`;
  if (lowerCaseProductName === "samsung 40 uhd smart tv")
    return `${assetProductsUrl}/smart-uhd-tv.png`;
  if (lowerCaseProductName === "benq gw2765he eye-care")
    return `${assetProductsUrl}/benq-screen.png`;

  return null;
};
