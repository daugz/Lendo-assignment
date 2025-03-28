import { type FC } from "react";
import { type Product } from "../../App";
import styles from "./card.module.css";
import Button from "../Button";

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
      <div className={styles.listContainer}>
        <h2 className={styles.h2}>{product?.name}</h2>

        <div className={styles.imageWrapper}>
          <img className={styles.image} src={findProductImage()}></img>
        </div>

        <ul className={styles.infoList}>
          <li className={styles.listItem}>
            <div className={styles.infoRow}>
              <p className={styles.paragraph}>{"Price:"}</p>{" "}
              <p className={styles.paragraph}>{product?.price} </p>
            </div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.infoRow}>
              <p className={styles.paragraph}>{"Weight:"}</p>{" "}
              <p className={styles.paragraph}>{product?.weight} </p>
            </div>
          </li>
          <li className={styles.listItem}>
            <div className={styles.infoRow}>
              <p className={styles.paragraph}>{"Availability:"}</p>{" "}
              <p className={styles.paragraph}>{product?.available} </p>
            </div>
          </li>
          <li className={styles.listItem}>
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
          </li>
        </ul>
        <Button text="Add to cart" />
      </div>
    </li>
  );
};
