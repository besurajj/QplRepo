import { Field, ErrorMessage } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import TextError from "../TextError/TextError";
import "./Input.scss";

const Input = (props) => {
  const {
    label,
    formik,
    name,
    variant,
    leftIcon,
    labelIconRight,
    labelIcon,
    rightIcon,
    leftIconClick,
    labelIconClick,
    rightIconClick,
    iconClr,
    isRequired = false,
    ...rest
  } = props;

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
      {label && (
        <Form.Label>
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
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
      <div
        className={`common_input_inner ${leftIcon ? "leftIconInput" : ""} ${
          rightIcon ? "rightIconInput" : ""
        }`}
      >
        {leftIcon && (
          <span
            className={`${leftIconClick ? "cursor-pointer" : ""} leftIcon`}
            onClick={leftIconClick}
          >
            {leftIcon}
          </span>
        )}
        <Field className="" name={name} {...rest} />
        {rightIcon && (
          <span
            className={`${
              rightIconClick ? "cursor-pointer" : ""
            } rightIcon ${iconClr}`}
            onClick={rightIconClick}
          >
            {rightIcon}
          </span>
        )}
      </div>
      {name && <ErrorMessage name={name} component={TextError} />}
    </Form.Group>
  );
};

export default Input;
