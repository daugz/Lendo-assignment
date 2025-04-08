import { type FC } from "react";
import style from "./button.module.css";

type Button = {
  text: string;
  id: number;
};

const Button: FC<Button> = ({ text, id }) => {
  return (
    <a className={style.button} href={`/details/${id}`}>
      {text}
    </a>
  );
};

export default Button;
