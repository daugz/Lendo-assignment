import { useParams } from "react-router";
import { Header } from "../components/Header/Header";
import { type Product } from "../types";
import { findProductImage } from "../utils";
import styles from "./detailspage.module.css";
import { Available } from "../components/Availability/Availability";
import { type Dispatch, type SetStateAction } from "react";

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
        {productDetails?.available && (
          <Available Available={productDetails?.available} />
        )}
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
        <div>
          {productDetails?.options.map((option) => {
            return (
              <div>
                <div>{option.color}</div>
                <div>
                  {option?.power && (
                    <select>
                      {option?.power?.map((powerOption) => {
                        return (
                          <option value={powerOption}>{powerOption}</option>
                        );
                      })}
                    </select>
                  )}
                </div>
                <div>{option.quantity}</div>
                <div>{option.storage} </div>
                {/* <select>
                {Array.isArray(option.color) ? (
                  option.color.map((colorOption) => {
                    return <option>{colorOption}</option>;
                    })
                    ) : (
                      <option>{option.color}</option>
                      )}
                      </select> */}
              </div>
            );
          })}
          <button onClick={handleOnClick}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};
