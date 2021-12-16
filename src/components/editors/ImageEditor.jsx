import React from "react";
import "../style/imageEditor.css";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import ContrastIcon from "@mui/icons-material/Contrast";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import InvertColorsOffIcon from "@mui/icons-material/InvertColorsOff";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export default function ImageEditor({ index, filter, active, handleClick }) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={handleClick}
    >
      {filter.name === "Brightness" && <Brightness6Icon />}
      {filter.name === "Contrast" && <ContrastIcon />}
      {filter.name === "Saturation" && <ColorLensIcon />}
      {filter.name === "Grayscale" && <InvertColorsOffIcon />}
      {filter.name === "Sepia" && <AutoFixHighIcon />}
      {filter.name === "Hue Rotate" && <RotateLeftIcon />}
      {filter.name === "Blur" && <AcUnitIcon />}

      <h4>{filter.name}</h4>
    </button>
  );
}

