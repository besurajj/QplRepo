import React, { memo } from "react";
import { Dropdown } from "react-bootstrap";
import "./customdropdown.scss";
import { Link } from "react-router-dom";
// import icon from '../../../../assets/images/icons/apple_icon.svg'

const Customdropdown = (props) => {
  const { toggleInfo, dropdownItems, dropdownItemInfo, className, text } =
    props;
  return (
    <div className={`custom_dropdown ${className}`}>
      <Dropdown>
        {/* Dropdown toggle */}
        <Dropdown.Toggle id="dropdown-basic">
          <div>
            {toggleInfo.toggleIcon && (
              <img src={toggleInfo.toggleIcon} alt="img" />
            )}
            <span
              style={{
                fontSize: "15px",
              }}
            >
              {" "}
              {text && `Select Game - `}
            </span>

            {/* {!text ? `Hi, ${toggleInfo.toggleTitle}` : text} */}
            {!text ? `Hello, Admin` : text}
          </div>
        </Dropdown.Toggle>
        {/* Dropdown Menu */}
        <Dropdown.Menu>
          {dropdownItems?.map((item, key) => (
            <Dropdown.Item
              // href={item.to}
              key={item?.value}
              onClick={() =>
                dropdownItemInfo.itemClickHandler(item?.value, item.label)
              }
              as={"div"}
            >
              <span>
                {dropdownItemInfo.itemIcon && (
                  <img src={item.itemIcon} alt="img" />
                )}
              </span>
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default memo(Customdropdown);
