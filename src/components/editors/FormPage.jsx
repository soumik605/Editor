import { TextField } from "@mui/material";
import React from "react";
import "../style/formPage.css";
import { connect } from "react-redux";
import {
  changeFormData,
  changeTextFieldIndex,
} from "../../service/Actions/FormAction";

const FormPage = (props) => {
  const handleChange = (e, index) => {
    props.changeFormData(index, e.target.value);
  };

  return (
    <div
      className="FormPage"
    >
      <TextField
        id="outlined-basic"
        label="Name"
        value={props.formDetails.formData[0].value}
        onChange={(e) => handleChange(e, 0)}
        onClick={() => {
          props.changeTextFieldIndex(0);
        }}
        variant="filled"
      />

      <TextField
        id="outlined-basic"
        label="Contest"
        value={props.formDetails.formData[1].value}
        onChange={(e) => handleChange(e, 1)}
        onClick={() => {
          props.changeTextFieldIndex(1);
        }}
        variant="filled"
      />

      <TextField
        id="outlined-basic"
        label="Organizer"
        value={props.formDetails.formData[2].value}
        onChange={(e) => handleChange(e, 2)}
        onClick={() => {
          props.changeTextFieldIndex(2);
        }}
        variant="filled"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({
  changeFormData: (index, value) => dispatch(changeFormData(index, value)),
  changeTextFieldIndex: (index) => dispatch(changeTextFieldIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
