import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./Room/reducer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

export type RootState = ReturnType<typeof store.getState>;