import {
  type MouseEventHandler,
  type SetStateAction,
  type Dispatch,
  type FC,
} from "react";
import styles from "./colorDisplay.module.css";
import { type Option } from "../../types";
import { findColor } from "../../utils";

export const ColorDisplay: FC<{
  option: Option;
  setOptionsDisplayed: Dispatch<SetStateAction<Option>>;
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
      <div className={` ${color === activeColor ? styles.active : ""} `}>
        <button
          className={`${styles.button} ${findColor(color)}  `}
          onClick={handleOnClick}
        />
      </div>
      <span className={styles.infoColorText}>{colorText}</span>
    </div>
  ) : (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${findColor(option.color)} `}
        onClick={handleOnClick}
      />
      <span className={styles.infoColorText}>{colorText}</span>
    </div>
  );
};
