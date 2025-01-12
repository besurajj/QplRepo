import { Form, Row, Col } from "react-bootstrap";
import "./UpdatePointsModal.scss";
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
const UpdatePointsModal = ({
  show,
  handleClose,
  title,
  fetchTopicData,
  initialData,
}) => {
  const handleSubmit = (values) => {
    if (initialData) {
      updateTopic(values);
    } else {
      addTopic(values);
    }
  };

  const initialValues = {
    name: initialData ? initialData.name : "",
    description: initialData ? initialData.description : "",
  };

  const addTopic = async (values) => {
    const payload = {
      name: values.name,
      description: values.description,
    };
    try {
      const response = await apiCallPost(`${API_URLS.ADD_TOPIC}`, payload);

      if (response && !response.error) {
        fetchTopicData();
        handleClose();
      } else {
        console.error("Error updating setting data");
      }
    } catch (error) {
      console.error("API Error during update:", error);
    }
  };
  const updateTopic = async (values) => {
    const payload = {
      topicId: initialData?.id,
      name: values?.name,
      description: values?.description,
    };
    try {
      const response = await apiCallPatch(`${API_URLS.UPDATE_TOPIC}`, payload);
      if (response && !response.error) {
        fetchTopicData();
        handleClose();
      } else {
        console.error("Error updating setting data");
      }
    } catch (error) {
      console.error("API Error during update:", error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(MESSAGES.REQUIRED)
      .min(2, MESSAGES.MINIMUM_2_CHARACTERS)
      .max(200, MESSAGES.MAXIMUM_200_CHARACTERS)
      .matches(FORMIK_REGEX.TITLE_REGEX, "Provide Valid Title"),
    description: Yup.string()
      .required(MESSAGES.REQUIRED)
      .min(2, MESSAGES.MINIMUM_2_CHARACTERS)
      .max(500, MESSAGES.MAXIMUM_500_CHARACTERS)
      .matches(FORMIK_REGEX.DESCRIPTION_REGEX, "Provide Valid Description "),
  });
  return (
    <CommonModal show={show} onHide={handleClose} heading={title}>
      <div className="edit_modal_content">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <FormikForm>
              <Row className="user-details mb-4">
                <Col>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <FormikControls
                      isRequired={true}
                      label={title}
                      placeholder={`Enter ${PLACEHOLDER_TEXT.TITLE}`}
                      control="input"
                      formik={formik}
                      name="name"
                      type="text"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <FormikControls
                      isRequired={true}
                      placeholder={`Enter ${PLACEHOLDER_TEXT.DESCRIPTION}`}
                      control="input"
                      formik={formik}
                      name="description"
                      type="text"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="modal-footer">
                <CommonBtn
                  className="disable-btn me-3"
                  role="btn"
                  title="Close"
                  onClick={handleClose}
                />
                <CommonBtn
                  className="ms-3"
                  role="btn"
                  title="Save Changes"
                  type="submit" // Ensure this triggers form submission
                  disabled={!formik.isValid || !formik.dirty}
                />
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </CommonModal>
  );
};

export default UpdatePointsModal;
