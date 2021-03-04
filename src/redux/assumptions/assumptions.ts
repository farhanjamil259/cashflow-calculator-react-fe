import axios from "axios";

import { assummptionsRoute } from "../../routes/apiRoutes";

export const getAssumptionsAction = () => async (dispatch: any) => {
  try {
    const data = (await axios.get(assummptionsRoute)).data;

    dispatch({
      type: "GET_ASSUMPTIONS",
      payload: {
        data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const assumptionReducer = (state = {}, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ASSUMPTIONS":
      return (state = payload.data);

    default:
      return state;
  }
};
