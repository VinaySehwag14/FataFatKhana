import { Fragment } from "react";

import classes from "./header.module.css";
import khana from "../../../assets/khana.jpg";
import HeaderCartButton from "../HeaderButton/HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Fatafatkhana</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={khana} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
