import React from "react";
import { Placeholder } from "react-bootstrap";

const CustomPlaceholder = ({ size }) => {
  return (
    <Placeholder  as="p" animation="glow">
      <Placeholder className="shimmer" xs={size} />
    </Placeholder>
  );
};

export default CustomPlaceholder;
