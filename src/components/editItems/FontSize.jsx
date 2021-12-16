import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { connect } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import { changeFontSize } from "../../service/Actions/FormAction";

const FontSize = (props) => {
  const [size, setSize] = useState(18);

  useEffect(() => {
    props.formDetails.currentFormFieldIndex != null &&
      setSize(
        props.formDetails.formData[props.formDetails.currentFormFieldIndex]
          .fontSize
      );
  }, [props.formDetails.currentFormFieldIndex]);

  return (
    <FormControl sx={{ ml: 1, p: 0, minWidth: 120 }} size="small">
      <InputLabel id="demo-simple-select-helper-label">Font Size</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label="Font Size"
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
          props.formDetails.currentFormFieldIndex !== null &&
            props.changeFontSize(
              props.formDetails.currentFormFieldIndex,
              e.target.value
            );
        }}
      >
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={14}>14</MenuItem>
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={18}>18</MenuItem>
        <MenuItem value={24}>24</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={36}>36</MenuItem>
        <MenuItem value={48}>48</MenuItem>
        <MenuItem value={60}>60</MenuItem>
        <MenuItem value={72}>72</MenuItem>
        <MenuItem value={96}>96</MenuItem>
      </Select>
    </FormControl>
  );
};

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({
  changeFontSize: (index, size) => dispatch(changeFontSize(index, size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FontSize);
