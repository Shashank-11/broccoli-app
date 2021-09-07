import * as React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.scss";

interface IProps {
  children: React.ReactNode;
}

const Layout = (props: IProps): React.ReactElement => {
  return (
    <div className="layout">
      <Header />
      <main id="content" tabIndex={-1} className="layout__main">
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
