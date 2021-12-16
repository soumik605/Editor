import React, { useRef, useCallback } from "react";
import { ColorPicker } from "react-canvas-color-picker";
import { connect } from "react-redux";

const ColorPickerPage = (props) => {
  const formats = useRef < ["rgba", "hsla"] > ["rgba"];

  const handleChange = useCallback(({ colors }) => {
    props.setColor({ ...colors.rgba });
  }, []);

  return (
    <ColorPicker
      spectrum="hsva"
      formats={formats.current}
      initialColor={props.color}
      onPanStart={handleChange}
      onPan={handleChange}
    />
  );
};

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerPage);
