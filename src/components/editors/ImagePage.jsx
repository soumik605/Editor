import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import "../style/imagePage.css";
import { connect } from "react-redux";
import CanvasImagePage from "./CanvasImagePage";
import { addBgImage } from "../../service/Actions/FormAction";

const ImagePage = (props) => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    props.addBgImage(URL.createObjectURL(e.target.files[0]));
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const getImageStyle = () => {
    if (props.formDetails.backgroundImage) {
      const filters = props.BG.map((option) => {
        return `${option.property}(${option.value}${option.unit})`;
      });
      return { filter: filters.join(" ") };
    }
  };

  return !photo ? (
    <label htmlFor="icon-button-file" className="input-label">
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => handlePhotoChange(e)}
      />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera
          style={{ justifyContent: "center", fontSize: "60px", color: "grey" }}
        />
      </IconButton>
    </label>
  ) : (
    <div style={getImageStyle()}>
      <CanvasImagePage />
    </div>
  );
};

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addBgImage: (image) => dispatch(addBgImage(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);
