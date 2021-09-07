import * as React from "react";

import "./Spinner.scss";

const Spinner: React.FC = () => (
  <div className="spinner" aria-live="polite">
    <div className="spinner__circle spinner__circle--1" />
    <div className="spinner__circle spinner__circle--2" />
  </div>
);

export default Spinner;
