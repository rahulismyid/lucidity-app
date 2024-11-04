import { combineReducers } from "redux";
import inventoryReducer from "./inventorySlice";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
});

export default rootReducer;
