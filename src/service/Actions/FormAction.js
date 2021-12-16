import {
  ADD_BG_IMAGE,
  ADD_IMAGE,
  CHANGE_CURRENT_IMAGEFIELD_INDEX,
  CHANGE_CURRENT_TEXTFIELD_INDEX,
  CHANGE_FORM_DATA,
  CHANGE_IMAGE_CORD,
} from "../Constaints";
import { store } from "../../index";

export const changeFormData = (index, value) => async (dispatch, getState) => {
  const data = store.getState().FormReducer.formData[index];
  const newData = {
    field: data.field,
    value: value,
    x: data.x,
    y: data.y,
    fontColor: data.fontColor,
    fontSize: data.fontSize,
    fontFamily: data.fontFamily,
  };

  dispatch({
    type: CHANGE_FORM_DATA,
    payload: { index, newData },
  });
};

export const changeTextFieldIndex = (index) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_CURRENT_TEXTFIELD_INDEX,
    payload: index,
  });
};

export const changeImageFieldIndex = (index) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_CURRENT_IMAGEFIELD_INDEX,
    payload: index,
  });
};

export const addBgImage = (image) => async (dispatch, getState) => {
  dispatch({
    type: ADD_BG_IMAGE,
    payload: image,
  });
};

export const addAImage = (image) => async (dispatch, getState) => {
  dispatch({
    type: ADD_IMAGE,
    payload: { image, x: 200, y: 200 },
  });
};

export const changeFontSize = (index, size) => async (dispatch, getState) => {
  const data = store.getState().FormReducer.formData[index];
  const newData = {
    field: data.field,
    value: data.value,
    x: data.x,
    y: data.y,
    fontColor: data.fontColor,
    fontSize: size,
    fontFamily: data.fontFamily,
  };

  dispatch({
    type: CHANGE_FORM_DATA,
    payload: { index, newData },
  });
};

export const changeFontFamily =
  (index, family) => async (dispatch, getState) => {
    const data = store.getState().FormReducer.formData[index];
    const newData = {
      field: data.field,
      value: data.value,
      x: data.x,
      y: data.y,
      fontColor: data.fontColor,
      fontSize: data.fontSize,
      fontFamily: family,
    };

    dispatch({
      type: CHANGE_FORM_DATA,
      payload: { index, newData },
    });
  };

export const changeFontColor = (index, color) => async (dispatch, getState) => {
  const data = store.getState().FormReducer.formData[index];
  const newData = {
    field: data.field,
    value: data.value,
    x: data.x,
    y: data.y,
    fontColor: [color.r, color.g, color.b, color.a],
    fontSize: data.fontSize,
    fontFamily: data.fontFamily,
  };

  dispatch({
    type: CHANGE_FORM_DATA,
    payload: { index, newData },
  });
};

export const changeTextCord = (index, x, y) => async (dispatch, getState) => {
  const data = store.getState().FormReducer.formData[index];
  const newData = {
    field: data.field,
    value: data.value,
    x: x,
    y: y,
    fontColor: data.fontColor,
    fontSize: data.fontSize,
    fontFamily: data.fontFamily,
  };

  await dispatch({
    type: CHANGE_FORM_DATA,
    payload: { index, newData },
  });
};

export const changeImageCord = (index, x, y) => async (dispatch, getState) => {
  const data = store.getState().FormReducer.images[index];
  const newData = {
    image: data.image,
    x: x,
    y: y,
  };

  dispatch({
    type: CHANGE_IMAGE_CORD,
    payload: { index, newData },
  });
};
