export const LoadingAction = (loading: boolean) => (dispatch: any) => {
  dispatch({
    type: "SET_LOADING",
    payload: {
      data: loading,
    },
  });
};

export const loadingReducer = (state = false, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_LOADING":
      return (state = payload.data);

    default:
      return state;
  }
};
