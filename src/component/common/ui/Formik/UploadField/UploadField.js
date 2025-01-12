import { Field, ErrorMessage } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import TextError from "../TextError/TextError";

import "./UploadField.scss";
import { UploadIcon } from "../../../../../assets/images/svg/SvgIcon";

const UploadField = (props) => {
  const {
    label,
    formik,
    name,
    variant,

    ...rest
  } = props;
  return (
    <Form.Group
      className={`uploadField common_input ${variant} ${
        formik.values[name] ? "hasFilled" : ""
      } ${
        formik?.touched[name] && formik?.errors[name]
          ? "common_input--error"
          : ""
      }`}
      controlId={name}
    >
      {label && <Form.Label>{label}</Form.Label>}
      <div className="uploadField__inner">
        <div className="uploadField__content">
          <UploadIcon />
          <small>Upload your document here</small>
        </div>
        <Field className="form-control" name={name} type="file" {...rest} />
      </div>
      <ErrorMessage name={name} component={TextError} />
    </Form.Group>
  );
};

export default UploadField;
