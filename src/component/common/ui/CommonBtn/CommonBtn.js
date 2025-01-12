import React from "react";
import { Link } from "react-router-dom";
import "./CommonBtn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";
const CommonBtn = ({
  title,
  className,
  icon,
  onClick,
  to,
  role,
  disabled,
  type,
  iconBefore = false,
  iconAfter = false,
  isLoading = false,
}) => {
  return (
    <>
      {(() => {
        switch (role) {
          case "btn":
            return (
              <button
                className={`commonBtn ${className}`}
                onClick={onClick}
                disabled={disabled || isLoading}
                type={type}
              >
                {iconBefore && (
                  <>
                    <span>{iconBefore}</span>
                  </>
                )}
                {title && <>{title}</>}
                {iconAfter && (
                  <>
                    <span>{iconAfter}</span>
                  </>
                )}
                {isLoading && (
                  <FontAwesomeIcon
                    icon={faCircleNotch}
                    spin
                    className="dashboard-icons"
                  />
                )}
              </button>
            );
          case "link":
            return (
              <Link
                to={to}
                className={`commonBtn ${className}`}
                onClick={onClick}
              >
                {iconBefore && (
                  <>
                    <span>{iconBefore}</span>
                  </>
                )}
                {title && <>{title}</>}
                {iconAfter && (
                  <>
                    <span>{iconAfter}</span>
                  </>
                )}
              </Link>
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

export default CommonBtn;
