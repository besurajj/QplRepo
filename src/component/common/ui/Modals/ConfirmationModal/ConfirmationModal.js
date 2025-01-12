import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./ConfirmationModal.scss";

const ConfirmationModal = ({
  show,
  onConfirm,
  onCancel,
  title,
  message,
  loading,
}) => {
  return (
    <Modal show={show} onHide={onCancel} className="confirmation-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body> <h5>{message}</h5> </Modal.Body>
      <Modal.Footer>
        <Button className="cancel_btn" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="close_btn" disabled={loading} onClick={onConfirm}>
          {loading ? "Loading..." : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
