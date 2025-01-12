import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AuthLayout } from "../../../common/layouts";
import { CommonBtn, FormikControls } from "../../../common/ui";
import { SuccessMessageModal } from "../../../common/ui";
import "./PagesStyle.scss";

const OtpVerification = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string().required("You have entered the wrong OTP"),
  });
  const onSubmit = (values) => {};
  return (
    <AuthLayout
      className="otp-verification"
      alt="otp_vector"
      title="OTP Verification"
      text="We have sent an OTP to the email address:
      john@gmail.com"
      isOtherMethodHide
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Row>
              <Col xs={12}>
                {/* <p>Enter Your 6 Digit OTP</p> */}
                <FormikControls
                  label="Enter Your 6 Digit OTP"
                  control="otp-input"
                  formik={formik}
                  name="otp"
                />
              </Col>
              <Col xs={12}>
                <CommonBtn
                  title="Submit"
                  role="btn"
                  className="w-100"
                  onClick={handleShow}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      <SuccessMessageModal
        show={show}
        onHide={handleClose}
        title="Login successful!"
        subText="You have logged into your account successfully"
      />
    </AuthLayout>
  );
};

export default OtpVerification;
