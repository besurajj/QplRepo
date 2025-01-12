import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const CopyIcon = (props) => {
  const { icon, className, text } = props;

  // State
  const [isCoppied, setIsCoppied] = useState(false);

  const iconClickHandler = () => {
    if (!isCoppied) {
      navigator.clipboard.writeText(text);
      setIsCoppied(true);
      setTimeout(() => {
        setIsCoppied(false);
      }, 500);
    }
  };

  return (
    <OverlayTrigger
      overlay={
        <Tooltip style={{ position: "fixed" }}>
          <p>{isCoppied ? "Copied" : "Copy ID"}</p>
        </Tooltip>
      }
    >
      <FontAwesomeIcon
        className={className ? className : ""}
        style={{ cursor: "pointer" }}
        icon={isCoppied ? faCheck : faCopy}
        onClick={iconClickHandler}
      />
    </OverlayTrigger>
  );
};

export default CopyIcon;
