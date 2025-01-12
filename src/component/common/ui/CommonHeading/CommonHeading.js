import React from "react";
import "./CommonHeading.scss";

const CommonHeading = ({ title, text }) => {
  return (
    <div className="common-heading">
      <h3>{title}</h3>
      <p className="fw-400">{text}</p>
    </div>
  );
};

export default CommonHeading;
