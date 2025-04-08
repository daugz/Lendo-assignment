import { useParams } from "react-router";
import { type Product } from "../../types";
import { findProductImage } from "../../utils";
import styles from "./detailspage.module.css";
import { Available } from "../../components";
import {
  type FC,
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
} from "react";
import { useFormAction } from "./hooks";
import { ProductOptions } from "./components";

export const DetailsPage = ({
  products,
  shoppingCart,
  setShoppingCart,
}: {
  products: Product[];
  cartCount: number;
  setShoppingCart: Dispatch<SetStateAction<string[]>>;
  shoppingCart: string[];
}) => {
  const { id } = useParams();

  const [showMessage, setShowMessage] = useState(false);

  const productDetails = products.filter(
    (product) => product.id?.toString() === id
  )[0];

  const { state, formAction } = useFormAction(
    productDetails,
    shoppingCart,
    setShoppingCart
  );

  useEffect(() => {
    if (state && state.type === "added") {
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 1500);
    }
  }, [state]);

  const imgUrl = findProductImage(productDetails?.name, productDetails?.brand);

  if (!productDetails) {
    <div>Could not find product</div>;
  }
  return (
    <>
      <form action={formAction}>
        <div className={styles.contentContainer}>
          <div>
            <div className={styles.headingContainer}></div>
            <h1 className={styles.h1}>Details</h1>
            <div className={styles.imageContainer}>
              {imgUrl && (
                <>
                  <input type="text" hidden name="image" value={imgUrl} />{" "}
                  <img className={styles.image} src={imgUrl} />
                </>
              )}
            </div>
            <input type="text" hidden name="id" value={productDetails?.id} />
            <input
              type="text"
              hidden
              name="name"
              value={productDetails?.name}
            />
            <h2 className={styles.h2}>{productDetails?.name}</h2>
            {<Available Available={productDetails?.available} />}
            <div className={styles.productInfoPrice}>
              {productDetails?.price} kr{" "}
              <input hidden name="price" value={productDetails?.price} />
            </div>
            <div className={styles.productInfoContainer}>
              <span className={styles.productInfoOption}>Weight: </span>
              {productDetails?.weight}
              <input hidden name="weight" value={productDetails?.weight} />
            </div>
            <div className={styles.productInfoContainer}>
              <input hidden name="brand" value={productDetails?.brand} />
              <span className={styles.productInfoOption}>Brand: </span>
              <input hidden value={productDetails?.brand} />
              {productDetails?.brand}
            </div>
            {productDetails?.options?.length > 0 && (
              <ProductOptions
                options={productDetails.options}
                available={productDetails.available}
              />
            )}
            <div>
              {showMessage && (
                <div className={styles.messagePopUp}>
                  <div className={styles.checkMark}>
                    <svg
                      viewBox="0 0 128 128"
                      width="40px"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="green"
                    >
                      <g>
                        <g>
                          <path d="M85.263,46.49L54.485,77.267L42.804,65.584c-0.781-0.782-2.047-0.782-2.828-0.002c-0.781,0.782-0.781,2.048,0,2.829    l14.51,14.513l33.605-33.607c0.781-0.779,0.781-2.046,0-2.827C87.31,45.708,86.044,45.708,85.263,46.49z M64.032,13.871    c-27.642,0-50.129,22.488-50.129,50.126c0.002,27.642,22.49,50.131,50.131,50.131h0.004c27.638,0,50.123-22.489,50.123-50.131    C114.161,36.358,91.674,13.871,64.032,13.871z M64.038,110.128h-0.004c-25.435,0-46.129-20.694-46.131-46.131    c0-25.434,20.693-46.126,46.129-46.126s46.129,20.693,46.129,46.126C110.161,89.434,89.471,110.128,64.038,110.128z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <p>{state?.message}</p>
                </div>
              )}
              {state?.type === "error" && (
                <div className={styles.messagePopUp}>
                  <p>{state?.message}</p>
                </div>
              )}
              <AddToCartButton available={productDetails?.available} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const AddToCartButton: FC<{ available: boolean }> = ({ available }) => {
  const isDisabled = !available ? styles.disabled : "";
  return (
    <button disabled={!available} className={`${styles.button} ${isDisabled}`}>
      Add to cart
    </button>
  );
};
