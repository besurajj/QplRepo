import React, { useState } from "react";
import "./OtpModal.scss";
import { Button, Modal } from "react-bootstrap";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiCallPost } from "../../../../../axios/axios";
import { API_URLS } from "../../../../../utils/constants";

const OtpModal = ({ show, handleClose, navigateTo, email ,onHide}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const verifyOtp = async () => {
    try {
      const payload = {
        email: email,
        otp,
        type: "SignIn",
      };

      console.log("Payload for OTP verification:", payload);
      let res = await apiCallPost(
        API_URLS.VERIFY_OTP,
        payload,
        {},
        false,
        false
      );
      if (!res?.error) {
        console.log("OTP verification successful", res);
        toast.success("OTP verified successfully!");
        localStorage.setItem("token", res?.data?.token);
        navigate(navigateTo);

      } else {
        throw new Error("OTP verification failed!");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("OTP verification failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      verifyOtp();
      setError("");
      setOtp("");
      handleClose();
    } else {
      setError("Invalid OTP. Please try again.");
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="otp-verification-modal"
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="w-100 text-center fw-bold">
          <h4 className="mb-0">Verify Your OTP</h4>
          <p className="text-muted fs-6 fw-normal mt-2">
            Enter the 6-digit code sent to your device
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pt-3">
        <div className="d-flex justify-content-center align-items-center otp-input mb-3">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              width: "40px",
              height: "40px",
              fontSize: "17px",
              margin: "5px",
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              outline: "none",
              transition: "border-color 0.2s ease-in-out",
            }}
            skipDefaultStyles
            renderSeparator={<span className="mx-1"></span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        {error && (
          <div className="alert alert-danger py-2 text-center" role="alert">
            {error}
          </div>
        )}
        <div className="text-center mb-3">
          <small className="text-muted">
            Didn't receive the code?{" "}
            <a href="#" className="text-success text-decoration-none">
              Resend
            </a>
          </small>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="success"
          onClick={handleSubmit}
          className="d-block mx-auto w-75 py-2 rounded-3 fw-semibold"
        >
          Verify OTP
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OtpModal;
