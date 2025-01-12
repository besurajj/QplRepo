import React from "react";
import Form from "react-bootstrap/Form";
// import FormCheckLabel from "react-bootstrap/FormCheckLabel";

import "./FormikControls.scss";

const Checkbox = ({ label, className, ...rest }) => {
  return (
    <>
      <Form.Label htmlFor="form-check"> {label} </Form.Label>
      <Form.Check
        id="form-check"
        className={`checkboxStyl ${className}`}
        checked={rest.checked}
        onChange={rest.onChange}
        {...rest}
      />
    </>
  );
};

export default Checkbox;
