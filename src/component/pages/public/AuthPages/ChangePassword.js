import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AuthLayout } from "../../../common/layouts";
import { CommonBtn, FormikControls } from "../../../common/ui";
import "./PagesStyle.scss";
import { EyeOpenIcon } from "../../../../assets/images/svg/SvgIcon";

const ChangePassword = () => {
  const initialValues = {
    mail: "",
    password: "",
    toggle: false,
  };

  const validationSchema = Yup.object({
    mail: Yup.string().required("You have entered a wrong email"),
    password: Yup.string().required("You have entered a wrong password"),
    check: Yup.string().required("Please click on checkbox before login"),
  });
  const onSubmit = (values) => {};
  return (
    <AuthLayout
      className="login-page change_pwd"
      // mainImg={login_man_img}
      alt="login_man_img"
      title="Change Password"
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
                <div className="group_form">
                  <FormikControls
                    label="Enter New Password"
                    placeholder="Enter new password"
                    control="input"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullname}
                    formik={formik}
                    name="password"
                  />
                  <div className="eyeIcon">
                    <EyeOpenIcon />
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <div className="group_form">
                  <FormikControls
                    label="Confirm Password"
                    placeholder="Re-enter Your Password"
                    control="input"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullname}
                    formik={formik}
                    name="password"
                  />
                  <div className="eyeIcon">
                    <EyeOpenIcon />
                  </div>
                </div>
              </Col>
              <Col xs={12}>
                <CommonBtn
                  title="Confirm"
                  role="link"
                  to="/otp-verification"
                  disabled={!formik.dirty}
                  className="w-100 login-page__loginBtn"
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ChangePassword;
