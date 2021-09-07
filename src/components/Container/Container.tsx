import * as React from "react";
import "./Container.scss";

interface IProps {
  children: React.ReactNode;
}

const Container = (props: IProps): React.ReactElement => {
  return <div className="container">{props.children}</div>;
};

export default Container;
