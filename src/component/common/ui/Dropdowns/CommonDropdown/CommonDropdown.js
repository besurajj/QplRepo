import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const CommonDropdown = ({
  dropdownList,
  disabled,
  className,
  onClick,
  children,
  isButton,
  isLink,
  isItem,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownList?.map((data, index) => {
          return (
            <div className={`dropdown-item ${className}`}>
              {isButton && (
                <button
                  onClick={onClick}
                  disabled={disabled}
                  type="button"
                  key={index}
                  active={data?.active}
                >
                  {data?.name}
                </button>
              )}
              {isLink && (
                <Link to={data?.linkPath} key={index} active={data?.active}>
                  {data?.name}
                </Link>
              )}
              {isItem && (
                <div className="dropdown-item--custom">{children}</div>
              )}
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CommonDropdown;
