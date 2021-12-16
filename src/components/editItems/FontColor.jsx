import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import ColorPickerPage from "./ColorPickerPage";
import "../style/fontColor.css";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { changeFontColor } from "../../service/Actions/FormAction";

const FontColor = (props) => {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    props.formDetails.currentFormFieldIndex != null &&
      setColor({
        r: props.formDetails.formData[props.formDetails.currentFormFieldIndex]
          .fontColor[0],
        g: props.formDetails.formData[props.formDetails.currentFormFieldIndex]
          .fontColor[1],
        b: props.formDetails.formData[props.formDetails.currentFormFieldIndex]
          .fontColor[2],
        a: props.formDetails.formData[props.formDetails.currentFormFieldIndex]
          .fontColor[3],
      });
  }, [props.formDetails.currentFormFieldIndex]);

  useEffect(() => {
    props.formDetails.currentFormFieldIndex != null &&
      props.changeFontColor(props.formDetails.currentFormFieldIndex, color);
  }, [color]);

  return (
    <>
      <Box
        className="color-container"
        onClick={() => setShowPicker(!showPicker)}
      >
        <Button size="small" sx={{ m: "auto 0", p: 0 }}>
          Color
        </Button>
        <Box
          size="small"
          sx={{
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          }}
        ></Box>
      </Box>

      {showPicker && (
        <ClickAwayListener onClickAway={() => setShowPicker(false)}>
          <div className="colorModel">
            <ColorPickerPage color={color} setColor={setColor} />
          </div>
        </ClickAwayListener>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({
  changeFontColor: (index, color) => dispatch(changeFontColor(index, color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FontColor);
