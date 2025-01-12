import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import CommonModal from "../CommonModal/CommonModal";
import CommonBtn from "../../CommonBtn/CommonBtn";
import { Formik, Form as FormikForm } from 'formik';
import FormikControls from "../../Formik/FormikControls";

const EditModal = ({ title, show, onHide, onSubmit, userData, convertToCamelCase }) => {
  const [initialValues] = useState({
    startPoints: userData?.value || ""
  });
  const name = userData?.name || ""; // Get the name from userData

  const handleSubmit = (values) => {
    onSubmit({ name, value: values.startPoints }); // Call onSubmit with name and value
    onHide(); // Hide the modal
  };

  return (
    <CommonModal show={show} onHide={onHide} heading={title}>
      <div className="edit_modal_content">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {formik => (
            <FormikForm>
              <Row className="user-details mb-4">
                <Col>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <FormikControls
                      isRequired={true}
                      label={convertToCamelCase(name)}
                      placeholder="Enter Name"
                      control="input"
                      value={convertToCamelCase(name)}
                      formik={formik}
                      name="name"
                      type="text"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Value</Form.Label>
                    <FormikControls
                      isRequired={true}
                      placeholder="Enter Value"
                      control="input"
                      value={formik.values.startPoints}
                      formik={formik}
                      min="1"
                      name="startPoints"
                      type="number"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="modal-footer">
                <CommonBtn
                  className="disable-btn me-3"
                  role="btn"
                  title="Close"
                  onClick={onHide}
                />
                <CommonBtn
                  className="ms-3"
                  role="btn"
                  title="Save Changes"
                  type="submit" // Ensure this triggers form submission
                />
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </CommonModal>
  );
};

export default EditModal;
