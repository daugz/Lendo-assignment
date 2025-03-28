import { type FC } from "react";
import styles from "./availability.module.css";

type Available = {
  Available: boolean;
};

export const Available: FC<Available> = ({ Available }) => {
  return Available ? (
    <div className={`${styles.availability} ${styles.available}`}>
      <span>Available</span>
    </div>
  ) : (
    <div className={`${styles.availability} ${styles.notAvailable}`}>
      <span>Sold out</span>
    </div>
  );
};
