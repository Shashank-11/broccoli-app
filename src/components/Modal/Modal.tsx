import * as React from "react";
import "./Modal.scss";

interface IProps {
  children: React.ReactNode;
  handleClose?: (e: React.MouseEvent<HTMLElement>) => void;
  show?: boolean;
}

const Modal = (props: IProps): React.ReactElement => {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal__main">
        <button
          className="modal__close"
          type="button"
          onClick={props.handleClose}
        >
          X
        </button>
        <div className="modal__header">Request an invite</div>
        {props.children}
      </section>
    </div>
  );
};

export default Modal;
