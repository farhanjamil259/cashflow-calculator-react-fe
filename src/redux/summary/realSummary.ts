import IChartsData from "../../interfaces/IChartsData";
import IForecastSummary from "../../interfaces/IForecastSummary";

export const setRealSummaryAction = (realSummary: IChartsData) => (dispatch: any) => {
  dispatch({
    type: "SET_REAL_SUMMARY",
    payload: {
      data: realSummary,
    },
  });
};

export const realSummaryReducer = (state = [], action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_REAL_SUMMARY":
      return (state = payload.data);

    default:
      return state;
  }
};
