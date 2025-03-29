import { useParams } from "react-router";
import { Header } from "../../components/Header/Header";
import { option, type Product } from "../../types";
import { findProductImage } from "../../utils";
import styles from "./detailspage.module.css";
import { Available } from "../../components/Availability/Availability";
import React, { FC, useState, type Dispatch, type SetStateAction } from "react";
import { ColorDisplay } from "./ColorDisplay";

export const DetailsPage = ({
  products,
  cartCount,
}: // setShoppingCart,
// shoppingCart,
{
  products: Product[];
  cartCount: number;
  setShoppingCart: Dispatch<SetStateAction<Product[]>>;
  shoppingCart: Product[];
}) => {
  const { id } = useParams();

  const productDetails = products.filter(
    (product) => product.id?.toString() === id
  )[0];

  const imgUrl = findProductImage(productDetails?.name, productDetails?.brand);

  const handleOnClick = () => {
    if (productDetails) {
      // setShoppingCart([...shoppingCart, productDetails]);
    }
  };

  if (!productDetails) {
    <div>Could not find product</div>;
  }

  return (
    <div>
      <Header cartCount={cartCount}></Header>
      <div className={styles.contentContainer}>
        <div className={styles.headingContainer}></div>
        <h1 className={styles.h1}>Details</h1>
        <div className={styles.imageContainer}>
          {imgUrl && <img className={styles.image} src={imgUrl} />}
        </div>
        <h2 className={styles.h2}>{productDetails?.name}</h2>
        {<Available Available={productDetails?.available} />}
        <div className={styles.productInfoContainer}>
          {productDetails?.price} kr{" "}
        </div>
        <div className={styles.productInfoContainer}>
          <span className={styles.productInfoOption}>Weight: </span>
          {productDetails?.weight}
        </div>
        <div className={styles.productInfoContainer}>
          <span className={styles.productInfoOption}>Brand: </span>
          {productDetails?.brand}
        </div>
        {productDetails?.options?.length > 0 && (
          <ProductOptions options={productDetails.options} />
        )}
        <div>
          <button className={styles.button} onClick={handleOnClick}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductOptions: FC<{ options: option[] }> = ({ options }) => {
  const [optionsDisplayed, setOptionsDisplayed] = useState<option>(options[0]);
  return (
    <div className={styles.optionsContainer}>
      <div className={styles.colorDisplayContainer}>
        {options.map((option, index) => {
          return (
            <React.Fragment key={index}>
              {option &&
                (Array.isArray(option?.color) ? (
                  option.color.map(() => {
                    return (
                      <ColorDisplay
                        option={option}
                        setOptionsDisplayed={setOptionsDisplayed}
                      />
                    );
                  })
                ) : (
                  <ColorDisplay
                    option={option}
                    setOptionsDisplayed={setOptionsDisplayed}
                  />
                ))}
            </React.Fragment>
          );
        })}
      </div>
      {optionsDisplayed?.quantity && (
        <div>Quantity: {optionsDisplayed.quantity}</div>
      )}{" "}
      <div>
        Power:
        {optionsDisplayed?.power && optionsDisplayed.power.length !== 1 ? (
          <select className={styles.select}>
            {optionsDisplayed?.power?.map((powerOption) => {
              return (
                <option key={powerOption} value={powerOption}>
                  {powerOption}
                </option>
              );
            })}
          </select>
        ) : (
          <div>{optionsDisplayed.power}</div>
        )}
      </div>
    </div>
  );
};

// </div>
// <div>{option.storage} </div>
