import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { connect } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import { changeFontFamily } from "../../service/Actions/FormAction";

const FontFamily = (props) => {
  const [family, setFamily] = useState("Arial");

  useEffect(() => {
    props.formDetails.currentFormFieldIndex != null &&
      setFamily(
        props.formDetails.formData[props.formDetails.currentFormFieldIndex]
          .fontFamily
      );
  }, [props.formDetails.currentFormFieldIndex]);

  return (
    <FormControl sx={{ ml: 1, minWidth: 130 }} size="small">
      <InputLabel id="demo-simple-select-helper-label">Font Family</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label="Font Family"
        value={family}
        onChange={(e) => {
          setFamily(e.target.value);
          props.formDetails.currentFormFieldIndex !== null &&
            props.changeFontFamily(
              props.formDetails.currentFormFieldIndex,
              e.target.value
            );
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"Arial"} style={{ fontFamily: "Arial" }}>
          Arial
        </MenuItem>
        <MenuItem value={"monospace"} style={{ fontFamily: "Monospace" }}>
          Monospace
        </MenuItem>
        <MenuItem value={"serif"} style={{ fontFamily: "Serif" }}>
          Serif
        </MenuItem>
        <MenuItem value={"cursive"} style={{ fontFamily: "Cursive" }}>
          Cursive
        </MenuItem>
        <MenuItem value={"fantasy"} style={{ fontFamily: "Fantasy" }}>
          Fantasy
        </MenuItem>
      </Select>
    </FormControl>
  );
};

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({
  changeFontFamily: (index, family) =>
    dispatch(changeFontFamily(index, family)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FontFamily);
