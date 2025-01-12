import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./CustomTooltip.scss";

const CustomTooltip = ({ content, children }) => {
  const renderTooltip = (props) => (
    <Tooltip id="custom-tooltip" className="custom-tooltip" {...props}>
      {content}
    </Tooltip>
  );
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <span>{children}</span>
    </OverlayTrigger>
  );
};

export default CustomTooltip;
