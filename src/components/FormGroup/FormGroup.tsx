import * as React from "react";
import "./FormGroup.scss";

interface IProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean | null | undefined;
  errorText?: string;
}

const FormGroup = (props: IProps): React.ReactElement => {
  return (
    <div className="form-group">
      <label className="form-group__label">{props.label}</label>
      <input
        className="form-group__input"
        type="text"
        value={props.value}
        onChange={props.onChange}
      />
      {props.isError && props.errorText && (
        <div className="form-group__error">{props.errorText}</div>
      )}
    </div>
  );
};

export default FormGroup;
