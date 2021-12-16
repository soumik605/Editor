import { CHANGE_FILTER } from "../Constaints";

export const changeFilter = (selectedOptionIndex, value) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_FILTER,
    payload: { selectedOptionIndex, value },
  });
};
