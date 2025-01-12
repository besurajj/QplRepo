import React from "react";

import "./TextError.scss";
import { ErrorIcon } from "../../../../../assets/images/svg/SvgIcon";
const TextError = (props) => {
  return (
    <div className="error_message">
      <span>
        <ErrorIcon />
      </span>
      {props.children}
    </div>
  );
};

export default TextError;
