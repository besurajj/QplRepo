import React, { memo, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "./CreateExam.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
import CommonTable from "../../../common/ui/CommonTable/CommonTable";
import { API_DATA_LIMIT, API_URLS } from "../../../../utils/constants";
import { toast } from "react-toastify";
import { apiCallGet, apiCallPost } from "../../../../axios/axios";
import Select from "react-select"; // Import react-select

const validationSchema = Yup.object({
  name: Yup.string().required("NAME IS REQUIRED"),
  description: Yup.string().required("DESCRIPTION IS REQUIRED"),
  startTime: Yup.date().required("START TIME IS REQUIRED"),
  endTime: Yup.date().required("END TIME IS REQUIRED"),
  examCode: Yup.string().required("EXAM CODE IS REQUIRED"),
  examDate: Yup.date().required("EXAM DATE IS REQUIRED"),
  contributionDeadline: Yup.date().required(
    "CONTRIBUTION DEADLINE IS REQUIRED"
  ),
  rollNumberAssignment: Yup.date().required(
    "ROLL NUMBER ASSIGNMENT IS REQUIRED"
  ),
  duration: Yup.number()
    .required("DURATION IS REQUIRED")
    .positive("MUST BE POSITIVE")
    .integer("MUST BE AN INTEGER"),
  maxMarks: Yup.number()
    .required("MAX MARKS IS REQUIRED")
    .positive("MUST BE POSITIVE"),
  passingMarks: Yup.number()
    .required("PASSING MARKS IS REQUIRED")
    .positive("MUST BE POSITIVE"),
  type: Yup.string().required("TYPE IS REQUIRED"),
  contributors: Yup.array()
    .of(Yup.string().required("CONTRIBUTOR ID IS REQUIRED"))
    .min(1, "AT LEAST ONE CONTRIBUTOR IS REQUIRED")
    .required("CONTRIBUTORS ARE REQUIRED"),
  totalQuestions: Yup.number()
    .required("TOTAL QUESTIONS IS REQUIRED")
    .positive("MUST BE POSITIVE")
    .integer("MUST BE AN INTEGER"),
  marksPerQuestion: Yup.number()
    .required("MARKS PER QUESTION IS REQUIRED")
    .positive("MUST BE POSITIVE"),
  subject: Yup.string().required("SUBJECT IS REQUIRED"),
});

const CreateExam = () => {
  const [contributorsOptions, setContributorsOptions] = useState([]);

  const initialValues = {
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    examCode: "",
    examDate: "",
    contributionDeadline: "",
    rollNumberAssignment: "",
    duration: "",
    maxMarks: "",
    passingMarks: "",
    type: "",
    contributors: [""],
    totalQuestions: "",
    marksPerQuestion: "",
    subject: "",
    registrationLastDate: "",
  };

  // Function to get contributors options from the API
  const getContributorOptions = async () => {
    try {
      const limit = API_DATA_LIMIT;
      const offset = 1;
      const role = "contributor";
      const res = await apiCallGet(
        `${API_URLS.GET_CONTRIBUTORS}/${role}/${limit}/${offset}`
      );
      if (!res?.error) {
        console.log("contributer response ", res);
        setContributorsOptions(res?.data); // Update the options state
      } else {
        throw new Error("Cannot fetch contributors options");
      }
    } catch (error) {
      console.log("Error fetching contributors:", error);
    }
  };

  // console.log("this is contributer options::::::::::", contributorsOptions);

  // Create Exam API call
  const createExam = async (values) => {
    const payload = {
      name: values.name,
      description: values.description,
      startTime: values.startTime,
      endTime: values.endTime,
      examCode: values.examCode,
      examDate: values.examDate,
      contributionDeadline: values.contributionDeadline,
      rollNumberAssignment: values.rollNumberAssignment,
      duration: values.duration,
      maxMarks: values.maxMarks,
      type: values.type,
      contributors: values.contributors,
      passingMarks: values.passingMarks,
      totalQuestions: values.totalQuestions,
      marksPerQuestion: values.marksPerQuestion,
      subject: values.subject,
      registrationLastDate: values.registrationLastDate,
    };

    try {
      const res = await apiCallPost(API_URLS.CREATE_EXAM, payload, false, true);
      if (!res?.error) {
        toast.success("Exam Created Successfully.");
      } else {
        throw new Error("Error creating exam");
      }
    } catch (error) {
      toast.error("Failed to create exam.");
    }
  };

  useEffect(() => {
    getContributorOptions();
  }, []); // Call API to get contributors when the component mounts

  return (
    // <section className="create_exam_form">
      <Container fluid>
        <Row>
          <Col>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={createExam}
            >
              {({ values, setFieldValue }) => (
                <Form className="exam_form">
                  <CommonTable className="form_table">
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Input</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "name", label: "Name", type: "text" },
                        {
                          name: "description",
                          label: "Description",
                          type: "text",
                        },
                        {
                          name: "startTime",
                          label: "Start Time",
                          type: "datetime-local",
                        },
                        {
                          name: "endTime",
                          label: "End Time",
                          type: "datetime-local",
                        },
                        { name: "examCode", label: "Exam Code", type: "text" },
                        { name: "examDate", label: "Exam Date", type: "date" },
                        {
                          name: "contributionDeadline",
                          label: "Contribution Deadline",
                          type: "date",
                        },
                        {
                          name: "rollNumberAssignment",
                          label: "Roll Number Assignment",
                          type: "date",
                        },
                        {
                          name: "duration",
                          label: "Duration (mins)",
                          type: "number",
                        },
                        {
                          name: "maxMarks",
                          label: "Max Marks",
                          type: "number",
                        },
                        {
                          name: "passingMarks",
                          label: "Passing Marks",
                          type: "number",
                        },
                        { name: "type", label: "Type", type: "text" },
                        {
                          name: "totalQuestions",
                          label: "Total Questions",
                          type: "number",
                        },
                        {
                          name: "marksPerQuestion",
                          label: "Marks Per Question",
                          type: "number",
                        },
                        { name: "subject", label: "Subject", type: "text" },
                        {
                          name: "registrationLastDate",
                          label: "Registration Last Date",
                          type: "date",
                        },
                      ].map(({ name, label, type }) => (
                        <tr key={name}>
                          <td>{label}</td>
                          <td>
                            <Field
                              type={type}
                              name={name}
                              className="form-control"
                              placeholder={`Enter ${label}`}
                            />
                            <ErrorMessage
                              name={name}
                              component="div"
                              className="error-message"
                            />
                          </td>
                        </tr>
                      ))}
                      <FieldArray name="contributors">
                        {({ push, remove, form }) => {
                          const { values, setFieldValue } = form;
                          console.log("This is values and sendfields", values);

                          return (
                            <tr>
                              <td>Contributors</td>
                              <td>
                                <Select
                                  isMulti
                                  name="contributors"
                                  options={contributorsOptions} // Options array fetched from the API
                                  value={values.contributors.map(
                                    (contributorId) => {
                                      // Find the full contributor object based on contributorId
                                      const selectedOption =
                                        contributorsOptions.find(
                                          (option) =>
                                            option.value === contributorId // Match using the correct field (`value` instead of `id`)
                                        );
                                      return selectedOption || null; // Return null if no match found
                                    }
                                  )}
                                  onChange={(selectedOptions) => {
                                    // Update Formik with the selected contributor ids (just the id values)
                                    const selectedValues = selectedOptions
                                      ? selectedOptions.map(
                                          (option) => option.value
                                        ) // Use `value` for storing selected contributor ids
                                      : [];
                                    setFieldValue(
                                      "contributors",
                                      selectedValues
                                    ); // Set the selected ids in Formik
                                  }}
                                  closeMenuOnSelect={false}
                                  components={{
                                    MultiValueRemove: ({
                                      data,
                                      innerProps,
                                    }) => (
                                      <div
                                        {...innerProps}
                                        style={{ cursor: "pointer" }}
                                      >
                                        &times;
                                      </div>
                                    ),
                                  }}
                                  getOptionLabel={(option) => option.name} // Render the label (name) of contributors in the options
                                  placeholder="Select Contributors"
                                />
                                <ErrorMessage
                                  name="contributors"
                                  component="div"
                                  className="error-message"
                                />
                                <Button
                                  type="button"
                                  variant="primary"
                                  onClick={() => push("")} // Add a new empty contributor
                                  className="mt-2"
                                >
                                  Add Contributor
                                </Button>
                              </td>
                            </tr>
                          );
                        }}
                      </FieldArray>
                    </tbody>
                    <div className="form_actions d-flex justify-content-center gap-3 mt-3 me-10">
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          fontSize: "1.5rem",
                          padding: "1rem 2rem",
                        }}
                      >
                        Submit
                      </Button>
                      <Button
                        type="reset"
                        className="btn btn-secondary"
                        style={{
                          fontSize: "1.5rem",
                          padding: "1rem 2rem",
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </CommonTable>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    // </section>
  );
};

export default memo(CreateExam);
