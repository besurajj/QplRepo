import React from "react";
import CommonModal from "../CommonModal/CommonModal";
import { Logo } from "../../../../../assets/images/svg/SvgIcon";
import successCheck from "../../../../../assets/images/icons/successCheck.svg";
import "./SuccessModal.scss";
import CommonBtn from "../../CommonBtn/CommonBtn";

const SuccessMessageModal = ({ show, onHide, title, subText }) => {
  return (
    <CommonModal show={show} onHide={onHide} className="success-modal">
      <div className="text-center">
        <span className="success-modal__logo">
          {/* <Logo /> */}
          <h1>Seha Admin</h1>
        </span>

        <div className="success-modal__img">
          <img src={successCheck} alt="success-img" />
        </div>
        {title && <h3>{title}</h3>}
        {subText && <p className="h5 fw-400">{subText}</p>}
        <CommonBtn
          role="btn"
          title="Back to home"
          className="w-100"
          onClick={onHide}
        />
      </div>
    </CommonModal>
  );
};

export default SuccessMessageModal;
