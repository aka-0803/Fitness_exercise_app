import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { exerciseOption, fetchData,youtubeOptions } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exercisVideos,setExerciseVideos] = useState([]);
  const [targetMuscle,setTargetMuscle] = useState([]);
  const [equipmentExercise,setEquipmentExercise] = useState([]);
  const {id} = useParams();
  useEffect(()=>{
    const fetchEXercisesData = async ()=>{
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`,exerciseOption);
      setExerciseDetail(exerciseDetailData);
      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);
      const targetMuscleData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,exerciseOption);
      setTargetMuscle(targetMuscleData);
      const equipmentData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,exerciseOption);
      setEquipmentExercise(equipmentData);
    }
    fetchEXercisesData();
  },[id])

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exercisVideos} name={exerciseDetail.name}/>
      <SimilarExercises targetMuscle={targetMuscle} equipmentExercise={equipmentExercise} />
    </Box>
  );
};

export default ExerciseDetail;
