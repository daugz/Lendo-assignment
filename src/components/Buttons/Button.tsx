import { type FC } from "react";
import style from "./button.module.css";

type Button = {
  text: string;
};

const Button: FC<Button> = ({ text }) => {
  return <button className={style.button}>{text}</button>;
};

export default Button;
