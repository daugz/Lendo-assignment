import { type FC } from "react";
import style from "./button.module.css";

type Button = {
  text: string;
};

const Button: FC<Button> = ({ text }) => {
  return <div className={style.button}>{text}</div>;
};

export default Button;
