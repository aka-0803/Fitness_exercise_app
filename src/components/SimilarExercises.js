import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";
const SimilarExercises = ({ targetMuscle, equipmentExercise }) => {
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0px" } }}>
      <Typography
        sx={{ fontSize: { lg: "44px", xs: "25px" }, ml: "20px" }}
        fontWeight={700}
        color="#000"
        mb="33px"
      >
        Exercises that target the same muscle group
      </Typography>
      <Stack direction={"row"} sx={{ p: "2", position: "relative" }}>
        {targetMuscle.length ? (
          <HorizontalScrollbar data={targetMuscle} />
        ) : (
          <Loader />
        )}
      </Stack>
      <Typography
        sx={{ fontSize: { lg: '44px', xs: '25px' }, ml: '20px', mt: { lg: '100px', xs: '60px' } }} fontWeight={700} color="#000" mb="33px"
      >
        Exercises that use the same equipment
      </Typography>
      <Stack direction={"row"} sx={{ p: "2", position: "relative" }}>
        {equipmentExercise.length ? (
          <HorizontalScrollbar data={targetMuscle} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
