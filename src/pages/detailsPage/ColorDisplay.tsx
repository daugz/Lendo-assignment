import {
  MouseEventHandler,
  SetStateAction,
  type Dispatch,
  type FC,
} from "react";
import styles from "./colorDisplay.module.css";
import { type option } from "../../types";
import { findColor } from "../../utils";

export const ColorDisplay: FC<{
  option: option;
  setOptionsDisplayed: Dispatch<SetStateAction<option>>;
  setColor: Dispatch<SetStateAction<string>>;
  activeColor: string;
}> = ({ option, setOptionsDisplayed, setColor, activeColor }) => {
  const color = Array.isArray(option?.color) ? option.color[0] : option.color;

  const colorText = color[0].toUpperCase() + color.slice(1);

  const handleOnClick = (e: MouseEventHandler<HTMLButtonElement>): void => {
    e.preventDefault();
    setColor(color);
    setOptionsDisplayed(option);
  };
  return Array.isArray(option?.color) ? (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${findColor(color)}  ${
          color === activeColor ? styles.active : ""
        } `}
        onClick={handleOnClick}
      />
      <span className={styles.infoColorText}>{colorText}</span>
    </div>
  ) : (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${findColor(option.color)} ${
          color === activeColor ? styles.active : ""
        }`}
        onClick={handleOnClick}
      />
      <span className={styles.infoColorText}>{colorText}</span>
    </div>
  );
};
