import React,{useEffect,useState} from 'react'
import {Box,Button,Stack,TextField,Typography} from '@mui/material';
import { exerciseOption,fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';
const SearchExercises = ({setExercises,bodyPart,setBodyPart}) => {
  
  const [search, setSearch] = useState('');
  
  const[bodyParts,setBodyParts] = useState([]);
  useEffect(()=>{
    const fetchExercisesData = async()=>{
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',exerciseOption);
      // console.log(bodyPartsData);
    setBodyParts(['all',...bodyPartsData])
    }
    
    fetchExercisesData();
    
  },[])

  const handleSearch = async ()=>{
    if(search){
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOption);
      console.log(exerciseData);
      const searchExercises = exerciseData.filter((exercise)=> exercise.name.toLowerCase().includes(search) || exercise.target.toLowerCase().includes(search) || exercise.equipment.toLowerCase().includes(search) || exercise.bodyPart.toLowerCase().includes(search));
      setSearch('');
      setExercises(searchExercises);
    }
  }
  return (
    
    <Stack alignItems="center" mt="37px" p="20px" justifyContent={'center'}>
      <Typography fontWeight={700} sx={{fontSize:{lg:'44px',xs:'30px'}}} mb='50px' textAlign={'center'}>
        Awesome Exercises You <br/>
        Should Know
      </Typography>
      <Box
      position={'relative'} mb='72px'>
        <TextField
        sx={{input:{
          fontWeight:'700',
          border:'none',borderRadius:'3px'
        },
      width:{lg:'800px',xs:'350px'},
    backgroundColor:'#fff',borderRadius:'40px'}}
        height='76px'
        value={search}
        onChange={(e)=>setSearch(e.target.value.toLowerCase())}
        placeholder='Search Exercises'
        type='text'
        />
        <Button className='search-btn'
        sx={{bgcolor:"#ff2625",
      color:"#fff",
    textTransform:'none',
  width:{lg:'175px',xs:'80px'},
fontSize:{lg:'20px',xs:'14px'},
height:'56px',
position:'absolute',
right:'0'}}
onClick={handleSearch}
        >Search</Button>
      </Box>
      <Box
      sx={{position:'relative',width:'100%',p:'20px'}}
      >
        <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts/>
      </Box>
    </Stack>
  )
}

export default SearchExercises