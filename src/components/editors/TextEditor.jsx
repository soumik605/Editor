import React from "react";
import { connect } from "react-redux";

import "../style/textEditor.css";
import FontSize from "../editItems/FontSize";
import FontFamily from "../editItems/FontFamily";
import FontColor from "../editItems/FontColor";
import AddImage from "../editItems/AddImage";

const TextEditor = (props) => {
  return (
    <div className="text-tools">
      <FontColor />
      <FontSize />
      <FontFamily />
      <AddImage />
    </div>
  );
};

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
