import React from "react";
import { ErrorMessage } from "formik";
import ReactCodeInput from "react-code-input";
import TextError from "../TextError/TextError";
import Form from "react-bootstrap/Form";
import "./MultiCodeInput.scss";

const MultiCodeInput = ({
  formik,
  name,
  labelIcon,
  label,
  labelIconClick,
  labelIconRight,
  onChange,
  onKeyDown,
  onKeyPress,
}) => {
  return (
    <div
      className={`multi-code  ${
        formik.touched[name] && formik.values[name]
          ? "multi-code--has-verified"
          : ""
      } ${
        formik?.touched[name] && formik?.errors[name] ? "multi-code--error" : ""
      }`}
    >
      {label && (
        <Form.Label>
          {label}
          {labelIcon && (
            <span
              onClick={labelIconClick}
              className={`labelIcon ${labelIconClick ? "cursor-pointer" : ""} ${
                labelIconRight ? "ms-auto" : ""
              }`}
            >
              {labelIcon}
            </span>
          )}
        </Form.Label>
      )}
      <ReactCodeInput
        type="number"
        fields={6}
        className="multi-code__field"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default MultiCodeInput;
