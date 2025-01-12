import React from "react";
import { useSelector } from "react-redux";
import LoaderUi from "./component/common/ui/Loader/LoaderUi";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";

function App() {
  const { isLoading } = useSelector((state) => state.loader);
  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  );
}

export default App;
