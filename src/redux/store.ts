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
import { realSummaryReducer } from "./summary/realSummary";
import { eventsReducer } from "./events/events";

const rootReducers = combineReducers({
  userReducer,
  loadingReducer,
  assumptionReducer,
  inputsReducer,
  clientsReducer,
  currentInputSetReducer,
  summaryReducer,
  activeClientReducer,
  realSummaryReducer,
  eventsReducer,
});

//store
const initialState: any = {};
const store = createStore(rootReducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
