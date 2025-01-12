import React, { memo } from "react";
import CommonModal from "../CommonModal/CommonModal";
import "./DocumentViewModal.scss";

const DocumentViewModal = ({ show, onHide, title, file }) => {
  const isPdf = file?.includes(".pdf");
  const objectStyle = {
    minHeight: isPdf ? "500px" : "auto",
  };

  return (
    <>
      <CommonModal
        show={show}
        onHide={onHide}
        heading={title}
        className="document-view-modal"
      >
        <object data={file} style={objectStyle}></object>
      </CommonModal>
    </>
  );
};

export default memo(DocumentViewModal);
