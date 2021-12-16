import React from "react";
import Slider from "@mui/material/Slider";

export default function SliderPage({ selectedOption, handleChange }) {
  return (
    <Slider
      aria-label="Default"
      min={selectedOption.min}
      max={selectedOption.max}
      value={selectedOption.value}
      onChange={handleChange}
    />
  );
}
