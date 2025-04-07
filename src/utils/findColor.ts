import styles from "./findColor.module.css";

export const findColor = (color: string): CSSModuleClasses[string] | null => {
  return styles[color];
};
