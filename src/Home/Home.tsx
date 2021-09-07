import * as React from "react";
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";

import InviteForm from "./InviteForm/InviteForm";
import { requestInvite } from "../services/requestInvite";

import "./Home.scss";

const Home: React.FC = () => {
  const [toggleModal, setToggleModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown | string>("");
  const [submitSuccess, setSubmitSuccess] = React.useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setToggleModal(!toggleModal);
  };

  const handleSubmit = async (nameVal: string, emailVal: string) => {
    setLoading(true);
    try {
      const response = await requestInvite(nameVal, emailVal);
      setLoading(false);
      setSubmitSuccess(true);
      console.log(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="home-page">
      <Container>
        <div className="home-page__content">
          <h1>A better way to enjoy everyday!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Button handleClick={handleClick}>Request an invite</Button>
        </div>
      </Container>
      <Modal show={toggleModal} handleClose={handleClick}>
        {error && <div className="home-page__error"> {error}</div>}
        {!submitSuccess ? (
          <InviteForm
            handleSubmit={(nameVal, emailVal) =>
              handleSubmit(nameVal, emailVal)
            }
            loading={loading}
          />
        ) : (
          <div>
            <p>An invite has been sent to your email.</p>
            <Button handleClick={handleClick}>ok</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
