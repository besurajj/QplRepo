import React from "react";
import "./ProfileSetting.scss";
import { CommonBtn, FormikControls } from "../../../common/ui";
import { Row, Col } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  EyeCloseIcon,
  EyeOpenIcon,
} from "../../../../assets/images/svg/SvgIcon";
import { useSelector } from "react-redux";
import { apiCallPatch } from "../../../../axios/axios";
import { API_URLS, FORMIK_REGEX } from "../../../../utils/constants";
import useLogout from "../../../../customHooks/useLogout";
import { useToggle } from "../../../../hooks/useToggle";
import { checkUndefiendValue, titleCase } from "../../../../utils/utils";

const ProfileSetting = () => {
  // Hooks
  const [logout] = useLogout();

  const [showPassword, togglePassword] = useToggle(false);
  const [showNewPassword, toggleNewPassword] = useToggle(false);
  const [showConfirmPassword, toggleConfirmPassword] = useToggle(false);
  const userData = useSelector((state) => state.user.userData);

  // Formik
  const initialValues = {
    oldPassword: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required("Current password is Required")
      .max(15, "Password must be less than 15 Characters")
      .matches(
        FORMIK_REGEX.PASSWORD_REGEX,
        "Must Contain 6 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character"
      ),
    password: Yup.string()
      .required("New password is Required")
      .matches(/^\S*$/, "Whitespace is not allowed")
      .max(15, "Password must be less than 15 Characters")
      .matches(
        FORMIK_REGEX.PASSWORD_REGEX,
        "Must Contain 6 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character"
      )
      .notOneOf(
        [Yup.ref("oldPassword")],
        "New Password shouldn't match Current Password"
      ),
    confirm_password: Yup.string()
      .required("Confirm password is Required")
      .max(15, "Password must be less than 15 Characters")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const onSubmit = async (values, formik) => {
    const { oldPassword, password, confirm_password } = values;
    let payload = {
      oldPassword : oldPassword,
      newPassword: password,
      confirmPassword: confirm_password,
    };
    changePassword(payload);
    formik.resetForm();
  };

  async function changePassword(payload) {
    try {
      let res = await apiCallPatch(
        API_URLS.CHANGE_PASSWORD,
        payload,
        {},
        true,
        true
      );
      if (!res.error) {
        logout();
      } else {
        throw new Error("Change password failed!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // async function handleImageUpload(e, type) {
  //   try {
  //     const file = e.target.files[0];
  //     if (file.size <= 5 * 1024 * 1024) {
  //       let data = new FormData();
  //       data.append("type", (type = "1"));
  //       data.append("upload", file);

  //       const results = await apiCallPost(
  //         "/api/v1/file/upload",
  //         data,
  //         {},
  //         "",
  //         true,
  //         {
  //           "Content-Type": "multipart/form-data",
  //           Accept: "application/json",
  //           type: "formData",
  //         }
  //       );

  //       if (results && !results.error) {
  //         dispatch(setUserData({ image: results.data.image }));
  //         updateProfileImage({ image: results.data.image });
  //       }
  //     } else {
  //       const uploadType = type === "Profile image";
  //       toasts.error(`${uploadType} should be less than 5MB.`); // Show an error message for exceeding the file size limit
  //       inputRef.current.value = "";
  //     }
  //   } catch (error) {}
  // }

  // const updateProfileImage = async (payload) => {
  //   let res = await apiCallPatch(
  //     "/api/v1/auth/updateImage",
  //     payload,
  //     {},
  //     true,
  //     true
  //   );
  //   if (!res.error) {
  //     getProfile();
  //   }
  // };
  return (
    <div className="Admin_profile">
      <div className="profile_setting">
        <div className="profile_account">
          {/* <div className="profile_img">
            <img
              src={userData?.image ? userData?.image : ""}
              alt="profile-img"
            />
            <div className="camera_img">
              <input
                className="upload__input"
                htmlFor="myInputProfile"
                type="file"
                name="profileImage"
                ref={profileInputRef}
                accept="image/png, image/jpeg , image/jpg"
                onChange={(e) => handleImageUpload(e, "profile")}
              />
              <img src={camera_icon} alt="camera-icon" />
            </div>
          </div> */}
          <p className="profile_title">
            {"Hi Raging Bull's Admin"}
            {/* {titleCase(checkUndefiendValue(userData?.name, "--"))} */}
          </p>
          {/* <p className="profile_mailId">
            {userData?.email ? userData?.email : "--"}
          </p> */}
        </div>
        <div className="changePwd_account">
          <h5>Change Password</h5>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Row className="design-input">
                  <Col xs={12}>
                    <div className="group_form">
                      <FormikControls
                        label="Current Password"
                        placeholder="Enter Your Password"
                        control="input"
                        type={showPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.oldPassword}
                        formik={formik}
                        name="oldPassword"
                        rightIconClick={() => togglePassword()}
                        rightIcon={
                          showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="group_form">
                      <FormikControls
                        label="New Password"
                        placeholder="Enter your password"
                        control="input"
                        type={showNewPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        formik={formik}
                        name="password"
                        rightIconClick={() => toggleNewPassword()}
                        rightIcon={
                          showNewPassword ? <EyeOpenIcon /> : <EyeCloseIcon />
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="group_form">
                      <FormikControls
                        label="Confirm Password"
                        placeholder="Enter your password"
                        control="input"
                        type={showConfirmPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirm_password}
                        formik={formik}
                        name="confirm_password"
                        rightIconClick={() => toggleConfirmPassword()}
                        rightIcon={
                          showConfirmPassword ? (
                            <EyeOpenIcon />
                          ) : (
                            <EyeCloseIcon />
                          )
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={12}>
                    <CommonBtn
                      title="Update"
                      role="btn"
                      disabled={!(formik.isValid && formik.dirty)}
                      className="w-100 update_btn"
                    />
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
