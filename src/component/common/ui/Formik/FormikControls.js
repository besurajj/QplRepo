import React from "react";
import Checkbox from "./Checkbox";
import DatePicker from "./Date/DatePicker";
import Input from "./Input/Input";
import Select from "./Select/Select";
import Radio from "./Radio";
import Textarea from "./TextArea/Textarea";
import UploadField from "./UploadField/UploadField";
import MultiCodeInput from "./MultiCodeInput/MultiCodeInput";
import "./Input/Input.scss";
import "./FormikControls.scss";
import BootstrapSelect from "./BootstrapSelect/BootstrapSelect";
import TimePicker from "./Time/TimePicker";

function FormikControls(props) {
  const { control, ...rest } = props;
  switch (control) {
    // case "search":
    //   return <Search {...rest} />;
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "bootstrap-select":
      return <BootstrapSelect {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "upload":
      return <UploadField {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "time":
      return <TimePicker {...rest} />;
    case "otp-input":
      return <MultiCodeInput {...rest} />;
    default:
      return null;
  }
}

export default FormikControls;
