import React from "react";
import { Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import SelectPicker from "react-select";
import TextError from "../TextError/TextError";
import "./Select.scss";

const Select = (props) => {
  const {
    name,
    formik,
    label,
    options,
    value,
    placeholder,
    className,
    disabled,
    isRequired = false,
    onBlur,
    ...rest
  } = props;

  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <Form.Group
      className={`customSelectPicker ${className} ${
        formik.values[name] ? "hasFilled" : ""
      } ${formik?.touched[name] && formik?.errors[name] ? "hasError" : ""}`}
      controlId={name}
    >
      <Form.Label>
        {label} {isRequired && <span style={{ color: "red" }}>*</span>}
      </Form.Label>

      <Field name={name} className="form-control" {...rest}>
        {() => (
          <SelectPicker
            classNamePrefix="react-select"
            placeholder={placeholder}
            value={defaultValue(options, value)}
            onChange={(selectedOption) => formik.setFieldValue(name, selectedOption.value)}
            onBlur={onBlur && onBlur}
            options={options}
            isDisabled={disabled}
            // menuIsOpen
          />
        )}
      </Field>

      <ErrorMessage name={name} component={TextError} />
    </Form.Group>
  );
};

export default Select;
