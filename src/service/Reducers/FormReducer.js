import {
  ADD_BG_IMAGE,
  ADD_IMAGE,
  CHANGE_CURRENT_IMAGEFIELD_INDEX,
  CHANGE_CURRENT_TEXTFIELD_INDEX,
  CHANGE_FORM_DATA,
  CHANGE_IMAGE_CORD,
} from "../Constaints";

const initialState = {
  formData: [
    {
      field: "name",
      value: "",
      x: 200,
      y: 200,
      fontColor: [0, 0, 0, 1],
      fontSize: 18,
      fontFamily: "Arial",
    },
    {
      field: "contest",
      value: "",
      x: 300,
      y: 300,
      fontColor: [0, 0, 0, 1],
      fontSize: 18,
      fontFamily: "Arial",
    },
    {
      field: "org",
      value: "",
      x: 400,
      y: 400,
      fontColor: [0, 0, 0, 1],
      fontSize: 18,
      fontFamily: "Arial",
    },
  ],
  images: [],
  backgroundImage: null,
  currentFormFieldIndex: null,
  currentImageFieldIndex: null,
};

export default function FormReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BG_IMAGE:
      return {
        ...state,
        backgroundImage: action.payload,
      };

    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload],
      };

    case CHANGE_FORM_DATA:
      const newFormData = state.formData.map((data, index) => {
        if (action.payload.index === index) {
          return action.payload.newData;
        } else {
          return data;
        }
      });
      return {
        ...state,
        formData: newFormData,
      };

    case CHANGE_CURRENT_TEXTFIELD_INDEX:
      return {
        ...state,
        currentFormFieldIndex: action.payload,
      };

    case CHANGE_CURRENT_IMAGEFIELD_INDEX:
      return {
        ...state,
        currentImageFieldIndex: action.payload,
      };

    case CHANGE_IMAGE_CORD:
      const newImageData = state.images.map((data, index) => {
        if (index === action.payload.index) {
          return action.payload.newData;
        } else {
          return data;
        }
      });
      return {
        ...state,
        images: newImageData,
      };

    default:
      return state;
  }
}
