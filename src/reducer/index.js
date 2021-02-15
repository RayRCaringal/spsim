import { combineReducers } from "redux";
import endReducer from "./endMade";
import startReducer from "./startMade";


const allReducers = combineReducers({
    start: startReducer,
    end: endReducer
})

export default allReducers