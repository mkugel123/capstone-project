import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function AddReststop() {

  const [formData, setFormData] = useState({
    has_gas: false,
    has_restroom: false,
    has_store: false
  })

  const [errors, setErrors] = useState([])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    })
    console.log(formData)
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="filled-basic" label="Nearest Exit" variant="filled" />
      <Typography variant="body2">
        <Checkbox name="has_gas" onChange={handleChange} {...label} checked={formData.has_gas} />
        Gas
        <br/>
        <Checkbox name="has_restroom" onChange={handleChange} {...label} checked={formData.has_restroom}  />
        Restroom
        <br/>
        <Checkbox name="has_store" onChange={handleChange} {...label} checked={formData.has_store}  />
        Convenience Store
        <br/>
      </Typography>
    </Box>
  );
}
export default AddReststop