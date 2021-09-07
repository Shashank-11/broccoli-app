export const checkName = (val: string) => {
  return val.length < 3;
};

export const isValidEmail = (email: string) => {
  const emailPattern =
    /^[._a-z0-9+-]*[^.]@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;
  return !emailPattern.test(email);
};

export const isValidConfirmEmail = (confirmEmail: string, email: string) => {
  return confirmEmail !== email;
};
