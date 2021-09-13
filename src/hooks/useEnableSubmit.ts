import * as React from "react";
interface IFields {
  isError: boolean | null;
  value: string;
}
export const useEnableSubmit = (
  fullName: IFields,
  email: IFields,
  confirmEmail: IFields
) => {
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
  return { enableSubmit };
};
