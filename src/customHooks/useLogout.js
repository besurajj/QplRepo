import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiCallPost } from "../axios/axios";
import { setUserData } from "../redux/user";
import { API_URLS } from "../utils/constants";

const useLogout = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux State
  // const userData = useSelector((state) => state.user.auth);

  const logout = async () => {
    // let payload = {
    //   id: userData,
    // };
    // apiCallPost(API_URLS.LOGOUT, payload, {}, false, true)
    //   .then((data) => {
    //     if (data && !data.error) {
          localStorage.clear();
          // dispatch(setUserData(""));
          navigate("/");
      //   }
      // })
      // .catch((error) => {});
  };
  return [logout];
};

export default useLogout;
