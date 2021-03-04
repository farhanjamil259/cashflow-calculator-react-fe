import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//reducers
import { userReducer } from "./auth/auth";
import { loadingReducer } from "./general/loading";
import { assumptionReducer } from "./assumptions/assumptions";
import { inputsReducer, currentInputSetReducer } from "./inputs/inputs";
import { activeClientReducer, clientsReducer } from "./clients/client";
import { summaryReducer } from "./summary/summary";
const rootReducers = combineReducers({
  userReducer,
  loadingReducer,
  assumptionReducer,
  inputsReducer,
  clientsReducer,
  currentInputSetReducer,
  summaryReducer,
  activeClientReducer,
});

//store
const initialState: any = {};
const store = createStore(rootReducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
