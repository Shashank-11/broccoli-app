import * as React from "react";
import Layout from "./components/Layout/Layout";
import Home from "./Home/Home";

const Main: React.FC = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default Main;
