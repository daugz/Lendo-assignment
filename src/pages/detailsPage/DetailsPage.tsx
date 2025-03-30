import { useParams } from "react-router";
import { option, type Product } from "../../types";
import { findProductImage } from "../../utils";
import styles from "./detailspage.module.css";
import { Available } from "../../components/Availability/Availability";
import React, {
  FC,
  useActionState,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ColorDisplay } from "./ColorDisplay";

export const DetailsPage = ({
  products,
  shoppingCart,
  setShoppingCart,
}: {
  products: Product[];
  cartCount: number;
  setShoppingCart: Dispatch<SetStateAction<Product[]>>;
  shoppingCart: Product[];
}) => {
  const { id } = useParams();

  const [state, formAction] = useActionState((previousState, formData) => {
    const id = formData.get("id");
    const image = formData.get("image");
    const name = formData.get("name");
    const price = formData.get("price");
    const brand = formData.get("brand");
    const weight = formData.get("weight");
    const color = formData.get("color");
    const power = formData.get("power");
    const storage = formData.get("storage");
    const quantity = Number(formData.get("quantity"));

    const cartProductId = id + brand + color + power + storage;

    const isProductAlreadyAdded = () => {
      const doesProductExist = sessionStorage.getItem(cartProductId);

      if (doesProductExist) {
        const parseProduct = JSON.parse(doesProductExist);
        return parseProduct;
      }
      return null;
    };

    const chosenProduct = {
      id: id,
      image: image,
      name: name,
      price: price,
      weight: weight,
      brand: brand,
      color: color,
      power: power,
      storage: storage,
      count:
        isProductAlreadyAdded() && isProductAlreadyAdded()?.count
          ? isProductAlreadyAdded().count + 1
          : 1,
    };

    if (productDetails.available && quantity > 0) {
      console.log("Added to cart");
      sessionStorage.setItem(cartProductId, JSON.stringify(chosenProduct));
      setShoppingCart([...shoppingCart, cartProductId]);
    }
    if (quantity === 0)
      return {
        type: "error",
        message: `Color is sold out`,
      };
  }, null);

  const productDetails = products.filter(
    (product) => product.id?.toString() === id
  )[0];

  console.log(sessionStorage.getItem(productDetails?.id?.toString()));
  const imgUrl = findProductImage(productDetails?.name, productDetails?.brand);

  if (!productDetails) {
    <div>Could not find product</div>;
  }
  return (
    <>
      {state && <p>{state?.message}</p>}
      <form action={formAction}>
        <div className={styles.contentContainer}>
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
          <input type="text" hidden name="name" value={productDetails?.name} />
          <h2 className={styles.h2}>{productDetails?.name}</h2>
          {<Available Available={productDetails?.available} />}
          <div className={styles.productInfoContainer}>
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
            <ProductOptions options={productDetails.options} />
          )}
          <div>
            <AddToCartButton available={productDetails?.available} />
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

const ProductOptions: FC<{ options: option[] }> = ({ options }) => {
  const [optionsDisplayed, setOptionsDisplayed] = useState<option>(options[0]);
  const [colorSelected, setColorSelected] = useState(
    Array.isArray(optionsDisplayed.color)
      ? optionsDisplayed.color[0]
      : optionsDisplayed.color
  );

  return (
    <div className={styles.optionsContainer}>
      <div className={styles.colorDisplayContainer}>
        <input
          className={`${styles.input} `}
          name="color"
          hidden
          value={colorSelected}
        />
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
                        setColor={setColorSelected}
                        activeColor={colorSelected}
                      />
                    );
                  })
                ) : (
                  <ColorDisplay
                    option={option}
                    setOptionsDisplayed={setOptionsDisplayed}
                    setColor={setColorSelected}
                    activeColor={colorSelected}
                  />
                ))}
            </React.Fragment>
          );
        })}
      </div>
      {optionsDisplayed?.quantity && optionsDisplayed?.quantity !== 0 ? (
        <>
          <input hidden name="quantity" value={optionsDisplayed.quantity} />
          <div>Quantity: {optionsDisplayed.quantity}</div>
        </>
      ) : (
        <>
          <input hidden name="quantity" value={optionsDisplayed.quantity} />
          <div>Sold out</div>
        </>
      )}
      {optionsDisplayed?.power && (
        <div>
          {
            <select name="power" className={styles.select}>
              {optionsDisplayed?.power?.map((powerOption, index) => {
                if (index === 0)
                  return (
                    <option
                      key={"Choose power:"}
                      defaultValue={"Choose power:"}
                      disabled
                      selected
                    >
                      Choose power:
                    </option>
                  );
                return (
                  <option key={powerOption} value={powerOption}>
                    {powerOption}
                  </option>
                );
              })}
            </select>
          }
        </div>
      )}
      {optionsDisplayed?.storage && (
        <div>
          storage:
          {
            <select name="storage" className={styles.select}>
              {optionsDisplayed?.storage?.map((storageOption, index) => {
                if (index === 0)
                  return (
                    <option
                      key={"Choose storage:"}
                      defaultValue={"Choose storage:"}
                      disabled
                      hidden
                    >
                      Choose storage:
                    </option>
                  );
                return (
                  <option key={storageOption} value={storageOption}>
                    {storageOption}
                  </option>
                );
              })}
            </select>
          }
        </div>
      )}
    </div>
  );
};

// </div>
