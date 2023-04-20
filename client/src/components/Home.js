import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {

  const [highways, setHighways] = useState([])

  useEffect(() => {
    fetch("/highways")
    .then(res => res.json())
    .then(highways => setHighways(highways))
  },[])

  const listOfHighways = highways.map((highway) => {
    return(
      <Item component={Button} key={highway.id}>{highway.name}</Item>
    )
  })

  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ textAlign: 'center' }} variant="h2" gutterBottom>
        Highways
      </Typography>
      <Stack spacing={2}>
        {listOfHighways}
      </Stack>
    </Box>
  );
}