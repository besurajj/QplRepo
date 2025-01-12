import React, { memo, useState } from "react";
import { Form } from "react-bootstrap";

const BootstrapSelect = (props) => {
  const { initialValue, options, onChange } = props;
  //   const [value, setValue] = useState(initialValue);

  const selectChangeHandler = (e) => {
    // let selectedValue = e?.target?.value;
    // setValue(selectedValue);
    onChange(e);
  };

  return (
    <Form.Select
      aria-label="User status"
      defaultValue={initialValue}
      //   value={value}
      onChange={(e) => selectChangeHandler(e)}
    >
      {options?.map((option) => (
        <option value={option?.value}>{option?.label}</option>
      ))}
    </Form.Select>
  );
};

export default memo(BootstrapSelect);
