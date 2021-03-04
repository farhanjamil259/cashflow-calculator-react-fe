import axios from "axios";

import { clientRoute } from "../../routes/apiRoutes";

//action imports
import { LoadingAction } from "../general/loading";
import { AlertAction } from "../general/alert";
import IClient from "../../interfaces/IClient";

export const CreateClientAction = (clientInfo: IClient) => async (dispatch: any) => {
  try {
    dispatch(LoadingAction(true));
    const data = await axios.post(clientRoute, clientInfo);

    if (data.status === 200) {
      dispatch(AlertAction(data.data.msg, "success"));
      dispatch(setActiveClientAction(data.data.data));
      await dispatch(GetClientsActions());
      return data.status;
    }
  } catch (err) {
    dispatch(AlertAction(err.message, "error"));
    dispatch(LoadingAction(false));
  }
};

export const DeleteClientAction = (clientid: string) => async (dispatch: any) => {
  try {
    dispatch(LoadingAction(true));
    const data = await axios.delete(clientRoute + clientid);
    dispatch(GetClientsActions());
    if (data.status === 200) {
      dispatch(AlertAction("Client Deleted", "error"));
    }
  } catch (err) {
    dispatch(AlertAction(err.message, "error"));
    dispatch(LoadingAction(false));
  }
};

export const GetClientsActions = () => async (dispatch: any) => {
  try {
    dispatch(LoadingAction(true));
    const data = await axios.get(clientRoute + sessionStorage.getItem("userid")!);

    dispatch({
      type: "SET_CLIENTS",
      payload: {
        data: data.data,
      },
    });
    dispatch(LoadingAction(false));
  } catch (err) {
    dispatch(AlertAction(err.message, "error"));
    dispatch(LoadingAction(false));
  }
};

export const setActiveClientAction = (client: any) => async (dispatch: any) => {
  try {
    dispatch(LoadingAction(true));

    dispatch({
      type: "SET_CLIENT",
      payload: {
        data: client,
      },
    });
  } catch (err) {
    dispatch(AlertAction(err.message, "error"));
    dispatch(LoadingAction(false));
  }
};

export const activeClientReducer = (state = {}, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CLIENT":
      return (state = payload.data);

    default:
      return state;
  }
};

export const clientsReducer = (state = [], action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CLIENTS":
      return (state = payload.data);

    default:
      return state;
  }
};
