import React from "react";
import { Image } from "@themesberg/react-bootstrap";

import G8Logo from "../assets/img/g8-logo.png";

const Preloader = (props) => {
  const { show } = props;

  return (
    <div
      className={`preloader bg-soft flex-column justify-content-center align-items-center ${
        show ? "" : "show"
      }`}
    >
      <Image
        className="loader-element animate__animated animate__jackInTheBox"
        alt="Preloader Icon"
        src={G8Logo}
        width={60}
      />
    </div>
  );
};

export default Preloader;
