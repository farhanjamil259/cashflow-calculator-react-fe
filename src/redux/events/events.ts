import axios from "axios";
import { eventsRoute } from "../../routes/apiRoutes";

import { AlertAction } from "../general/alert";

export const getEventsAction = (planid: string) => async (dispatch: any) => {
  try {
    const data = await axios.get(eventsRoute + planid);

    if (data.status === 200) {
      await dispatch({
        type: "GET_EVENTS",
        payload: {
          data: data.data,
        },
      });
    }
  } catch (err) {
    dispatch(AlertAction(err.message, "error"));
  }
};

export const eventsReducer = (state = {}, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_EVENTS":
      return (state = payload.data);

    default:
      return state;
  }
};
