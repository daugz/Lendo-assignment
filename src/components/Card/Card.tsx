import { type FC } from "react";
import { type Product } from "../../App";
import styles from "./card.module.css";

type Card = {
  product: Product;
};

export const Card: FC<Card> = ({ product }) => {
  const findProductImage = (): string => {
    const assetProductsUrl = "/Products";

    const lowerCaseProductName = product.name.toLowerCase();
    if (lowerCaseProductName === "philips hue bulb")
      return `${assetProductsUrl}/philips-hue.png`;
    if (lowerCaseProductName === "trådfria lampor")
      return `${assetProductsUrl}/tradfri.png`;
    if (lowerCaseProductName === "playstation 4")
      return `${assetProductsUrl}/playstation-4.png`;
    if (lowerCaseProductName === "nintendo switch")
      return `${assetProductsUrl}/nintendo-switch.png`;
    if (lowerCaseProductName === "bluetooth speaker")
      return `${assetProductsUrl}/bluetooth-speaker.png`;
    if (lowerCaseProductName === "electrical toothbrush")
      return `${assetProductsUrl}/electrical-toothbrush.png`;
    if (lowerCaseProductName === "samsung 40 uhd smart tv")
      return `${assetProductsUrl}/smart-uhd-tv.png`;
    if (lowerCaseProductName === "benq gw2765he eye-care")
      return `${assetProductsUrl}/benq-screen.png`;

    return "";
  };

  return (
    <li key={product?.id} className={styles.card}>
      <h2 className={styles.h2}>{product?.name}</h2>
      <img className={styles.image} src={findProductImage()}></img>

      <ul className={styles.infoList}>
        <li className={styles.listItem}>
          <div className={styles.infoRow}>
            <p>{"Price:"}</p> <p>{product?.price} </p>
          </div>
        </li>
        <li className={styles.listItem}>
          <div className={styles.infoRow}>
            <p>{"Weight:"}</p> <p>{product?.weight} </p>
          </div>
        </li>
        <li className={styles.listItem}>
          <div className={styles.infoRow}>
            <p>{"Availability:"}</p> <p>{product?.available} </p>
          </div>
        </li>
        <li className={styles.listItem}>
          <div className={styles.infoRow}>
            <p>{"Brand:"}</p> <p>{product?.brand} </p>
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

            {"Power:"}
          </div>
          {product?.options.map((option) => {
            return (
              <div className={""}>
                <p>{option.color}</p>
                <p>{option.power}</p>
                <p>{option.quantity}</p>
                <p>{option.storage}</p>
              </div>
            );
          })}
        </li>
      </ul>
    </li>
  );
};
