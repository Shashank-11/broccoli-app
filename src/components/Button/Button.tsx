import * as React from "react";
import Spinner from "../Spinner/Spinner";
import "./Button.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  loading?: boolean;
}

const Button = (props: IProps): React.ReactElement => {
  return (
    <button className="button" onClick={props.handleClick}>
      {props.loading ? <Spinner /> : props.children}
    </button>
  );
};

export default Button;
