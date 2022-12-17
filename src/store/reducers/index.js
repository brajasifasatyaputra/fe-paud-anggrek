import { combineReducers } from "redux";
import mainReducer from "./reducer";

const rootReducer = combineReducers({
  mainReducer: mainReducer,
});

export default rootReducer;
