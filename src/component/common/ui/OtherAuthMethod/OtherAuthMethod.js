import React from "react";
import CommonBtn from "../CommonBtn/CommonBtn";
import google_icon from "../../../../assets/images/icons/google_icon.svg";
import fb_icon from "../../../../assets/images/icons/fb_icon.svg";
import apple_icon from "../../../../assets/images/icons/apple_icon.svg";
import "./OtherAuthMethod.scss";

const options = [
  {
    icon: google_icon,
    // onClick: "",
  },
  {
    icon: fb_icon,
    // onClick: "",
  },
  {
    icon: apple_icon,
    // onClick: "",
  },
];

const OtherAuthMethod = () => {
  return (
    <div className="other-auth">
      <p className="text-center">Or</p>
      <ul className="other-auth__btns">
        {options.map((data, index) => {
          return (
            <li key={index}>
              <CommonBtn
                role="btn"
                className="w-100 outline-btn"
                iconBefore={<img src={data.icon} alt="icon" />}
                // onClick={data.onClick}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OtherAuthMethod;
