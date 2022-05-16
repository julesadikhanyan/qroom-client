import { combineReducers } from "redux";

import roomReducer from "./Room/reducer";
import userReducer from "./User/reducer";
import alertReducer from "./Alert/reducer";

export default combineReducers({
    roomReducer,
    userReducer,
    alertReducer
});
