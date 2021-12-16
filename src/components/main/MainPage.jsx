import React, { useState } from "react";
import { connect } from "react-redux";
import Crop from "@mui/icons-material/Crop";
//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImageEditor from "../editors/ImageEditor";
import SliderPage from "../SliderPage";
import "../style/main.css";
import TextEditor from "../editors/TextEditor";
import ImagePage from "../editors/ImagePage";
import FormPage from "../editors/FormPage";
import CropImage from "../editors/CropImage";
import { changeFilter } from "../../service/Actions/BGActions";

function MainPage(props) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [openCropModel, setOpenCropModel] = useState(false);
  const selectedOption = props.BG[selectedOptionIndex];

  const handleSliderChange = ({ target }) => {
    props.changeFilter(selectedOptionIndex, target.value);
  };


  return (
    <>
      {openCropModel && props.formDetails.backgroundImage && (
        <CropImage model={setOpenCropModel} />
      )}

      <div className="container">
        <div className="text-editor">
          <TextEditor />
        </div>

        <div className="main-image">
          <ImagePage />
          <FormPage />
        </div>

        <div className="slider">
          <SliderPage
            selectedOption={selectedOption}
            handleChange={handleSliderChange}
          />
        </div>

        <div className="edit-items">
          <button className="crop-btn" onClick={() => setOpenCropModel(true)}>
            <Crop />
            <h4>Crop</h4>
          </button>
          {props.BG.map((filter, index) => {
            return (
              <ImageEditor
                key={index}
                index={index}
                filter={filter}
                active={index === selectedOptionIndex}
                handleClick={() => setSelectedOptionIndex(index)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  BG: state.BGReducer,
  formDetails: state.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({
  changeFilter: (index, value) => dispatch(changeFilter(index, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
