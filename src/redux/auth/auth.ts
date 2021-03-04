import axios from "axios";

import { loginRoute, registerRoute } from "../../routes/apiRoutes";

//action imports
import { LoadingAction } from "../general/loading";
import { AlertAction } from "../general/alert";
import { GetClientsActions } from "../clients/client";

export const LoginAction = (userInfo: any) => async (dispatch: any) => {
  try {
    dispatch(LoadingAction(true));
    const data = await axios.post(loginRoute, userInfo);

    if (data.status === 200) {

      dispatch({
        type: "LOGIN_USER",
        payload: {
          data: data.data,
        },
      });
      sessionStorage.setItem("userid", data.data._id);
      await dispatch(GetClientsActions());
      return data.status;
    } else if (data.status === 203) {
      dispatch(AlertAction(data.data.msg, "error"));
    }
    dispatch(LoadingAction(false));
  } catch (err) {
    dispatch(AlertAction(err.message, "error"));
    dispatch(LoadingAction(false));
  }
};

export const RegisterAction = (userInfo: any) => async (dispatch: any) => {
  try {
    dispatch(LoadingAction(true));
    const data = await axios.post(registerRoute, userInfo);
    sessionStorage.setItem("userid", data.data._id);

    dispatch(LoadingAction(false));

    if (data.status === 203) {
      dispatch(AlertAction(data.data.msg, "error"));
    } else if (data.status === 201) {
      dispatch(AlertAction("Registration Successful", "success"));
    }

    dispatch({
      type: "REGISTER_USER",
      payload: {
        data: data.data,
      },
    });
    return data.status;
  } catch (err) {
    dispatch(AlertAction(err.message, "error"));
    dispatch(LoadingAction(false));
  }
};

export const userReducer = (state = {}, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER":
      return (state = payload.data);
    case "REGISTER_USER":
      return (state = payload.data);

    default:
      return state;
  }
};
