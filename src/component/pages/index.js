import React from "react";

// auth pages
const OtpVerification = React.lazy(() =>
  import("./public/AuthPages/OtpVerification")
);
const ChangePassword = React.lazy(() =>
  import("./public/AuthPages/ChangePassword")
);
const ErrorPage = React.lazy(() => import("./public/ErrorPage"));

export { OtpVerification, ChangePassword, ErrorPage };
