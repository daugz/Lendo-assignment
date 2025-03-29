import { type FC } from "react";
import { type Product } from "../../App";
import styles from "./card.module.css";
import Button from "../Buttons/Button";
import { Available } from "../Availability/Availability";

type Card = {
  product: Product;
};
const findProductImage = (name: string, brand: string): string => {
  const assetProductsUrl = "/Products";

  const lowerCaseBrand = brand.toLowerCase();
  const lowerCaseProductName = name.toLowerCase();

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

  return "";
};
export const Card: FC<Card> = ({ product }) => {
  return (
    <li key={product?.id} className={styles.card}>
      <div className={styles.listContainer}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={findProductImage(product.name, product.brand)}
          />
        </div>
        <h2 className={styles.h2}>{product?.name}</h2>

        <Available Available={product.available} />
        <div className={styles.listItem}>
          <div className={styles.infoRow}>
            <p className={styles.paragraph}>{product?.price + " kr"} </p>
          </div>
        </div>

        {/* <li className={styles.listItem}>
            <div className={styles.infoRow}>
              <p className={styles.paragraph}>{"Brand:"}</p>{" "}
              <p className={styles.paragraph}>{product?.brand} </p>
            </div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.infoRowOptions}>
              {product.options.map((option) => {
                if (option?.color) {
                  return (
                    <>
                      {"Color:"}
                      <select className={styles.select}>
                        {<option value={option.color}>{option.color}</option>}
                      </select>
                    </>
                  );
                } else if (option?.power) {
                  return (
                    <>
                      {"Power:"}
                      <select className={styles.select}>
                        {product.options.map((option) => {
                          return (
                            <option value={option.power}>{option.power}</option>
                          );
                        })}
                      </select>
                    </>
                  );
                } else return <></>;
              })}
            </div>
            {product?.options.map((option) => {
              return (
                <div className={""}>
                  <p className={styles.paragraph}>{option.color}</p>
                  <p className={styles.paragraph}>{option.power}</p>
                  <p className={styles.paragraph}>{option.quantity}</p>
                  <p className={styles.paragraph}>{option.storage}</p>
                </div>
              );
            })}
          </li> */}
        <Button text="More info" />
      </div>
    </li>
  );
};
