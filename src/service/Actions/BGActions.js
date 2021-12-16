import { CHANGE_FILTER } from "../Constaints";

export const changeFilter = (index, value) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_FILTER,
    payload: { index, value },
  });
};
