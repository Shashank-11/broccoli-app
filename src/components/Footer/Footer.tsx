import * as React from "react";
import "./Footer.scss";
import Container from "../Container/Container";

const Header: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__container">
          <div>Broccoli and Co. footer</div>
        </div>
      </Container>
    </footer>
  );
};

export default Header;
