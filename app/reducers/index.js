import { combineReducers } from "redux";
import AuthReducer from "./auth";
import RoleReducer from "./role";

export default combineReducers({
    auth: AuthReducer,
    role: RoleReducer
});
