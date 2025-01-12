import React, { useCallback, useState } from "react";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AuthLayout } from "../../../common/layouts";
import { CommonBtn, FormikControls } from "../../../common/ui";
import "./PagesStyle.scss";
import {
  EyeCloseIcon,
  EyeOpenIcon,
} from "../../../../assets/images/svg/SvgIcon";
import { apiCallGet, apiCallPost } from "../../../../axios/axios";
import { useToggle } from "../../../../hooks/useToggle";
import { debounce, throttle } from "../../../../utils/utils";
import { API_URLS, ENV, ROUTES } from "../../../../utils/constants";
import OtpModal from "../../../common/ui/Modals/OtpModal/OtpModal";

const Login = () => {
  const isButton = true;

  const [showPassword, togglePassword] = useToggle(false);
  const navigate = useNavigate();
  const [validateOtp, setValidateOtp] = useState(false);
  const [inputEmail, setInputEmail] = useState();
  const [show, setShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    secretKey: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const login = async (values) => {
    // console.log('vales',values)
    setIsLoading(true);
    try {
      const payload = {
        email: values.email,
        secretKey: values.secretKey,
      };
      setInputEmail(values.email);
      console.log("secret key", payload.secretKey);

      let res = await apiCallPost(API_URLS.LOGIN, payload, {}, false, true);
      if (!res?.error) {
        setShow(true);
        console.log("inside response", res);
      } else {
        throw new Error("Login failed!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = async (values) => {
    try {
      console.log("object", values);
      await login(values);
    } catch (error) {
      console.error(error);
    }
  };
  // const throttleLoginButton = useCallback(
  //   throttle((values, actions) => onSubmit(values, actions), 500),
  //   [onSubmit]
  // );

  return (
    <AuthLayout
      isLogin={true}
      className="login-page"
      alt="login_man_img"
      // title="Login to Raging Bull Admin"
      isButton={isButton}x
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Row className="customInput design-input">
              <Col xs={12}>
                <FormikControls
                  label="Email"
                  placeholder="Enter email"
                  control="input"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  formik={formik}
                  name="email"
                />
              </Col>
              <Col xs={12}>
                <FormikControls
                  className="customInput "
                  label="Secret Key"
                  placeholder="Secret Key"
                  control="input"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // value={formik.values.fullname}
                  formik={formik}
                  name="secretKey"
                  rightIconClick={() => togglePassword()}
                  rightIcon={showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
                />
              </Col>
              <Col>
                {/* {show && ( */}
                <OtpModal
                  show={show}
                  handleClose={handleClose}
                  email={inputEmail}
                  onHide={handleClose}
                  navigateTo={ROUTES.EXAM_MANAGEMENT}
                />
              </Col>
              <Col xs={12}>
                <CommonBtn
                  title="Login"
                  role="btn"
                  type="Submit"
                  className="w-100 login-page__loginBtn mt-3"
                  // disabled={
                  //   !formik.dirty || !formik.isValid || formik.isSubmitting
                  // }
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
