import React from "react";
import Modal from "react-bootstrap/Modal";
import "./CommonModal.scss";
import { CrossIcon } from "../../../../../assets/images/svg/SvgIcon";
import { Button, ModalBody } from "react-bootstrap";

const CommonModal = ({
  show,
  onHide,
  className,
  size,
  heading,
  children,
  closeButton,
  scrollable,
  onClose,
  infoImage,
  infoImageClass,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      centered
      scrollable={scrollable}
      className={`common-modal ${className}`}
    >
      {heading && (
        <Modal.Header className={infoImageClass ? "infoImageClas" : ""}>
          {infoImage && (
            <div className="infoImageClass_main"> {infoImage} </div>
          )}
          <Modal.Title>{heading} </Modal.Title>
          <Button
            className="close_btn"
            onClick={() => {
              onHide();
              onClose && onClose();
            }}
          >
            <CrossIcon />
          </Button>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CommonModal;
