import { type FC } from "react";
import styles from "./colorDisplay.module.css";

export const ColorDisplay: FC<{ color: string }> = ({ color }) => {
  const findColor = (color: string): CSSModuleClasses[string] | null => {
    if (color === "red") return styles.red;
    if (color === "white") return styles.white;
    if (color === "green") return styles.green;
    if (color === "black") return styles.black;
    if (color === "orange") return styles.orange;
    else return null;
  };

  return (
    <>
      <div className={`${styles.display} ${findColor(color)}`} />
      <span>{color}</span>
    </>
  );
};
