import IForecastSummary from "../../interfaces/IForecastSummary";

export const setSummaryAction = (summary: IForecastSummary) => (dispatch: any) => {

  dispatch({
    type: "SET_SUMMARY",
    payload: {
      data: summary,
    },
  });

};

export const summaryReducer = (state = [], action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SUMMARY":
      return (state = payload.data);

    default:
      return state;
  }
};
