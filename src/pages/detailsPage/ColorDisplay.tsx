import { type Dispatch, type FC } from "react";
import styles from "./colorDisplay.module.css";
import { option } from "../../types";

export const ColorDisplay: FC<{
  option: option;
  setOptionsDisplayed: Dispatch.SetStateAction<any>;
}> = ({ option, setOptionsDisplayed }) => {
  console.log(option);
  const findColor = (color: string): CSSModuleClasses[string] | null => {
    if (color === "red") return styles.red;
    if (color === "white") return styles.white;
    if (color === "green") return styles.green;
    if (color === "black") return styles.black;
    if (color === "orange") return styles.orange;
    else return null;
  };
  const color = Array.isArray(option?.color) ? option.color[0] : option.color;
  const colorText = color[0].toUpperCase() + color.slice(1);

  const handleOnClick = () => {
    setOptionsDisplayed(option);
  };

  return Array.isArray(option?.color) ? (
    <button className={`${styles.button} `} onClick={handleOnClick}>
      <div className={`${styles.display} ${findColor(color)}`} />
      <span className={styles.infoColorText}>{colorText}</span>
    </button>
  ) : (
    <button className={`${styles.button} `} onClick={handleOnClick}>
      <div className={`${styles.display} ${findColor(option.color)}`} />
      <span className={styles.infoColorText}>{colorText}</span>
    </button>
  );
};
