import { Button, Input } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { addAImage } from "../../service/Actions/FormAction";

const AddImage = (props) => {
  return (
    <label htmlFor="contained-button-file" style={{ margin: "0 20px" }}>
      <Input
        accept="image/*"
        id="contained-button-file"
        type="file"
        onChange={(e) =>
          props.addAImage(URL.createObjectURL(e.target.files[0]))
        }
        style={{ display: "none" }}
      />
      <Button variant="contained" component="span">
        Add
      </Button>
    </label>
  );
};

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addAImage: (image) => dispatch(addAImage(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);
