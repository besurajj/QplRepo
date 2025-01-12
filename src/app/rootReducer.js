import { combineReducers } from "redux";
import loader from "../redux/loader";
import exam from "../redux/exam";
import filters from "../redux/filters";
import topic from "../redux/topic";
import user from "../redux/user"

const createRootReducer = () =>
  combineReducers({
    exam,
    loader,
    filters,
    topic,
    user,
  });

export default createRootReducer;
