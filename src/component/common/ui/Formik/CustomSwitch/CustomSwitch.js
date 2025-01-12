import React from "react";
import "./CustomSwitch.scss";

const CustomSwitch = ({ checked, onChange }) => {
  const handleChange = () => {
    if (onChange) {
      onChange(!checked); 
    }
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="slider"></span>
    </label>
  );
};

export default CustomSwitch;
