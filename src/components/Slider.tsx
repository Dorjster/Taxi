import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value}₮`;
}

export default function DiscreteSlider() {
  return (
    <Box sx={{ width: "95%" }}>
      <Slider
        aria-label="Temperature"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={2000}
        marks
        min={0}
        max={10000}
        sx={{
          color: "gray",
          "& .MuiSlider-thumb": {
            backgroundColor: "black",
          },
          "& .MuiSlider-track": {
            backgroundColor: "gray",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "lightgray",
          },
        }}
      />
      {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
    </Box>
  );
}
