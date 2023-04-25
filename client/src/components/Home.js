import React, { useEffect, useState } from 'react';
import Reststops from './Reststops';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Home() {

  const [highways, setHighways] = useState([])
  const [reststops, setRestStops] = useState([])

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch("/highways")
    .then(res => res.json())
    .then(highways => setHighways(highways))
  },[])

  function handleHighwayClick(highway){
    setOpen(true)
    fetch(`highways/${highway.id}/reststops`)
    .then((res) => res.json())
    .then(reststops=>setRestStops(reststops))
  }

  function handleReststopDelete(deletedReststop) {
    const updatedReststops = reststops.filter(reststop => reststop.id !== deletedReststop.id)
    setRestStops(updatedReststops)
  }

  function handleReststopEdit(updatedReststop) {
    const updatedReststops = reststops.map((reststop) => {
      if(reststop.id === updatedReststop.id){
        return updatedReststop
      } else {
        return reststop
      }
    })
    setRestStops(updatedReststops)
  }

  const listOfHighways = highways.map((highway) => {
    return(
      <Item component={Button} key={highway.id} onClick={()=>handleHighwayClick(highway)}>
        {highway.name}
      </Item>
    )
  })

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Button sx={{margin: "10px"}} variant="contained" component={Link} to={"/addreststop"}>Add Reststop</Button>
        <Typography sx={{ textAlign: 'center' }} variant="h2" gutterBottom>
          Highways
        </Typography>
        <Stack spacing={2}>
          {listOfHighways}
        </Stack>
      </Box>
      <Reststops 
        open={open}
        handleClose={handleClose}
        reststops={reststops}
        onReststopDelete={handleReststopDelete}
        onReststopEdit={handleReststopEdit}
      />
    </>
  );
}

export default Home