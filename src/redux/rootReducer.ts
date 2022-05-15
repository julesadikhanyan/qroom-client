import { combineReducers } from "redux";

import roomReducer from "./Room/reducer";
import userReducer from "./User/reducer";

export default combineReducers({
    roomReducer,
    userReducer
});
