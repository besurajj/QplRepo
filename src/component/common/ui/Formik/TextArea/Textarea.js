import { Field, ErrorMessage } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import TextError from "../TextError/TextError";
const Textarea = (props) => {
  const { label, formik, name, variant, ...rest } = props;
  return (
    <Form.Group
      className={`common_input ${variant} ${
        formik.values[name] ? "hasFilled" : ""
      } ${
        formik?.touched[name] && formik?.errors[name]
          ? "common_input--error"
          : ""
      }`}
      controlId={name}
    >
      <Form.Label>{label}</Form.Label>
      <div className="common_input_inner common_textarea_inner">
        <Field as="textarea" className="form-control" name={name} {...rest} />
      </div>
      <ErrorMessage name={name} component={TextError} />
    </Form.Group>
  );
};

export default Textarea;
