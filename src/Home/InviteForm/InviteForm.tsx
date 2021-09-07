import * as React from "react";

import FormGroup from "../../components/FormGroup/FormGroup";
import Button from "../../components/Button/Button";

import { checkName, isValidEmail, isValidConfirmEmail } from "../homeUtils";
import "./InviteForm.scss";

interface IProps {
  handleSubmit: (name: string, email: string) => void;
  loading: boolean;
}

interface IFields {
  isError: boolean | null;
  value: string;
}

const InviteForm = (props: IProps): React.ReactElement => {
  const [fullName, setFullName] = React.useState<IFields>({
    isError: null,
    value: "",
  });
  const [email, setEmail] = React.useState<IFields>({
    isError: null,
    value: "",
  });
  const [confirmEmail, setConfirmEmail] = React.useState<IFields>({
    isError: null,
    value: "",
  });
  const [enableSubmit, setEnableSubmit] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (
      fullName?.isError !== null &&
      !fullName?.isError &&
      email?.isError !== null &&
      !email?.isError &&
      confirmEmail?.isError !== null &&
      !confirmEmail?.isError
    ) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [fullName, email, confirmEmail]);

  React.useEffect(() => {
    if (confirmEmail.value)
      setConfirmEmail((preState) => {
        return {
          ...preState,
          isError: isValidConfirmEmail(confirmEmail.value, email.value),
        };
      });
  }, [email.value, confirmEmail.value]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (enableSubmit) {
      props.handleSubmit(fullName.value, email.value);
    }
  };
  return (
    <form className="home-page__form">
      <FormGroup
        label="Full Name"
        value={fullName.value}
        onChange={(e) =>
          setFullName({
            isError: checkName(e.target?.value),
            value: e.target?.value,
          })
        }
        isError={fullName.isError}
        errorText="Name should be atleast 3 letters"
      />
      <FormGroup
        label="Email"
        value={email.value}
        onChange={(e) =>
          setEmail({
            isError: isValidEmail(e.target?.value),
            value: e.target?.value,
          })
        }
        isError={email.isError}
        errorText="Please enter correct email"
      />
      <FormGroup
        label="Confirm Email"
        value={confirmEmail.value}
        onChange={(e) =>
          setConfirmEmail({
            isError: isValidConfirmEmail(e.target?.value, email.value),
            value: e.target?.value,
          })
        }
        isError={confirmEmail.isError}
        errorText="Please enter same email address"
      />
      <Button role="submit" handleClick={handleClick} loading={props.loading}>
        {enableSubmit ? "Submit" : "Disabled"}
      </Button>
    </form>
  );
};

export default InviteForm;
