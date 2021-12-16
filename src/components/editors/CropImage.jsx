import React, { useState } from "react";
import { connect } from "react-redux";
import "../style/cropStyle.css";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ReactCrop from "react-image-crop";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import Crop54Icon from "@mui/icons-material/Crop54";
import Crop169Icon from "@mui/icons-material/Crop169";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@mui/material";
import { addBgImage } from "../../service/Actions/FormAction";

const CropImage = (props) => {
  const [crop, setCrop] = useState(null);
  const [image, setImage] = useState(null);

  const getCroppedImg = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const data = canvas.toDataURL("image/jpeg");
    props.addBgImage(data);
    props.model(false);
  };

  return (
    <div className="Container">
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <div className= "PopupBox">
          <div className="Close" onClick={() => props.model(false)}>
            X
          </div>

          <div className="Main">
            <div className="LeftDiv">
              <ReactCrop
                src={props.formDetails.backgroundImage}
                crop={crop}
                onChange={setCrop}
                onImageLoaded={setImage}
              />
            </div>
            <div className="RightDiv">
              <Button
                onClick={() => setCrop(null)}
                variant="outlined"
                startIcon={<CropSquareIcon />}
              >
                Custom
              </Button>
              <Button
                onClick={() => setCrop({ aspect: 1 / 1 })}
                variant="outlined"
                startIcon={<CropSquareIcon />}
              >
                1 : 1
              </Button>
              <Button
                onClick={() => setCrop({ aspect: 3 / 2 })}
                variant="outlined"
                startIcon={<Crop54Icon />}
              >
                3 : 2
              </Button>
              <Button
                onClick={() => setCrop({ aspect: 16 / 9 })}
                variant="outlined"
                startIcon={<Crop169Icon />}
              >
                16 : 9
              </Button>
              <Button
                onClick={() => setCrop({ aspect: 9 / 16 })}
                variant="outlined"
                startIcon={<CropPortraitIcon />}
              >
                9 : 16
              </Button>
              <Button
                variant="contained"
                color="success"
                style={{ marginTop: "auto" }}
                onClick={getCroppedImg}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </ClickAwayListener>
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

export default connect(mapStateToProps, mapDispatchToProps)(CropImage);
