import {
  MouseEventHandler,
  SetStateAction,
  type Dispatch,
  type FC,
} from "react";
import styles from "./colorDisplay.module.css";
import { type option } from "../../types";

export const ColorDisplay: FC<{
  option: option;
  setOptionsDisplayed: Dispatch<SetStateAction<option>>;
  setColor: Dispatch<SetStateAction<string>>;
}> = ({ option, setOptionsDisplayed, setColor }) => {
  const color = Array.isArray(option?.color) ? option.color[0] : option.color;

  const findColor = (color: string): CSSModuleClasses[string] | null => {
    if (color === "red") return styles.red;
    if (color === "white") return styles.white;
    if (color === "green") return styles.green;
    if (color === "black") return styles.black;
    if (color === "orange") return styles.orange;
    else return null;
  };
  const colorText = color[0].toUpperCase() + color.slice(1);

  const handleOnClick = (e: MouseEventHandler<HTMLButtonElement>): void => {
    e.preventDefault();
    setColor(color);
    setOptionsDisplayed(option);
  };
  return Array.isArray(option?.color) ? (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${findColor(color)}  ${findColor(color)} `}
        onClick={handleOnClick}
      />
      <span className={styles.infoColorText}>{colorText}</span>
    </div>
  ) : (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${findColor(option.color)}`}
        onClick={handleOnClick}
      />
      <span className={styles.infoColorText}>{colorText}</span>
    </div>
  );
};
