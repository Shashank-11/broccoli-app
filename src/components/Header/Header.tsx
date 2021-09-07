import * as React from "react";
import "./Header.scss";
import logo from "../../assets/broccoli-img.png";
import Container from "../Container/Container";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__container">
          <img
            src={logo}
            alt="broccoli logo"
            aria-hidden="true"
            role="presentation"
          />
          <div>Broccoli and Co.</div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
