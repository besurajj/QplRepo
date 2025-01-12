import { Form, Row, Col } from "react-bootstrap";
import "./ResultModal.scss";
import { apiCallPatch, apiCallPost } from "../../../../../axios/axios";
import {
  API_URLS,
  FORMIK_REGEX,
  MESSAGES,
  PLACEHOLDER_TEXT,
} from "../../../../../utils/constants";
import FormikControls from "../../Formik/FormikControls";
import CommonModal from "../CommonModal/CommonModal";
import { Formik, Form as FormikForm } from "formik";
import CommonBtn from "../../CommonBtn/CommonBtn";
import * as Yup from "yup";
import CommonTable from "../../CommonTable/CommonTable";
const ResultModal = ({ show, handleClose, title, initialData }) => {
  const initialValues = {
    percentage: initialData ? initialData?.userResult?.percentage || "Null" : 0,
    Result: initialData ? initialData?.userResult?.result :" N/A",
    Status: initialData ? initialData?.userResult?.status :" N/A",
  };

  return (
    <CommonModal show={show} onHide={handleClose} heading={title}>
      {/* <div className="edit_modal_content"> */}
      <CommonTable
        className="user_management_table"
        // loading={{ rows: , columns: 7 }}
      >
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Percentage</th>
            <th>Result</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {initialValues && (
            <tr>
              <td>1</td>
              <td>{initialValues.percentage}</td>
              <td>{initialValues.Status}</td>
              <td>{initialValues.Result}</td>
            </tr>
          )}
        </tbody>
      </CommonTable>
      {/* </div> */}
    </CommonModal>
  );
};

export default ResultModal;
