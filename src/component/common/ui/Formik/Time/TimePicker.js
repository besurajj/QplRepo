import { Field, ErrorMessage } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextError from "../TextError/TextError";
import "./Time.scss";
import "../Input/Input.scss";

const TimePicker = (props) => {
  const { label, name, placeholder, ...rest } = props;
  return (
    <Form.Group className="common_date common_input" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <div className="common_input_inner">
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <TimePicker
                id={name}
                className="form-control"
                {...field}
                {...rest}
                selected={value}
                onChange={(val) => setFieldValue(name, val)}
                placeholderText={placeholder}
                autoComplete="off"
              />
            );
          }}
        </Field>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </Form.Group>
  );
};

export default TimePicker;

