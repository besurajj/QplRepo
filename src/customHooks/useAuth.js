const useAuth = () => {
  const auth = localStorage.getItem("token");
  if (auth && auth !== "undefined" && auth != "null") {
    return true;
  } else return false;
};

export default useAuth;
