import axios from "axios";

import { inputsRoute } from "../../routes/apiRoutes";
import { LoadingAction } from "../general/loading";

export const GetInputsAction = (clientid: string) => async (dispatch: any) => {
  try {
    dispatch(LoadingAction(true));
    const data = (await axios.get(inputsRoute + "all/" + clientid)).data;
    dispatch(LoadingAction(false));
    dispatch({
      type: "GET_INPUTS",
      payload: {
        data,
      },
    });
  } catch (err) {}
};

export const ResetInputsAction = () => (dispatch: any) => {
  dispatch({
    type: "RESET_INPUTS",
    payload: {
      data: [],
    },
  });
};

export const setCurrentInputSetAction = (inputSet: any) => (dispatch: any) => {
  dispatch({
    type: "SET_INPUTS",
    payload: {
      data: inputSet,
    },
  });
};

export const currentInputSetReducer = (state = {}, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_INPUTS":
      return (state = payload.data);

    default:
      return state;
  }
};

export const inputsReducer = (state = [], action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_INPUTS":
      return (state = payload.data);
    case "RESET_INPUTS":
      return (state = payload.data);
    default:
      return state;
  }
};
