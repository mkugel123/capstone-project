import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom'


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function AddReststop({ highways, onAddHighwaySubmit }) {

  const [formData, setFormData] = useState({
    has_gas: false,
    has_restroom: false,
    has_store: false,
    highway_id: 1
  })

  const [highwayFormData, setHighwayFormData] = useState({})

  const [errors, setErrors] = useState([])

  const [isClicked, setIsClicked] = useState(false)

  const history = useHistory()

  function handleChange(e) {

    const name = e.target.name
    let value = e.target.value

    if(e.target.type === "checkbox"){
      value = e.target.checked
    }

    setFormData({
      ...formData,
      [name]: value
    })
    console.log(formData)
  }

  function handleHighwayNameChange(e) {
    setHighwayFormData({name: e.target.value})
  }

  function handleSubmit(event){
    event.preventDefault();
    fetch("/reststops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((newReststop) => console.log(newReststop)).then(history.push('/'));
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    })
  }

  function handleAddHighwaySubmit(e) {
    e.preventDefault()
    fetch("/highways", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highwayFormData),
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((newHighway) => onAddHighwaySubmit(newHighway));
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    })

    setIsClicked(false)
  }

  const highwayOptions = highways.map((highway)=>{
    return(
      <MenuItem key={highway.id} value={highway.id}>{highway.name}</MenuItem>
    )
  })

  return (
    <>
      <Button sx={{margin: "10px"}} variant="contained" onClick={()=>setIsClicked(!isClicked)}>Add Highway</Button>
        {isClicked ?
          <form onSubmit={handleAddHighwaySubmit}>
            <TextField 
              id="filled-basic" 
              label="Highway Name" 
              variant="filled" 
              value={highwayFormData.name} 
              onChange={handleHighwayNameChange}
            />
            <Button 
              type='submit' 
              sx={{margin: "10px"}} 
              variant="contained">
            Submit
            </Button>
          </form> :
          null
        }
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Select onChange={handleChange} value={formData.highway_id} name='highway_id'>
          {highwayOptions}
        </Select>
        <br/>
        <TextField name='nearest_exit' id="filled-basic" label="Nearest Exit" variant="filled" value={formData.nearest_exit} onChange={handleChange}/>
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
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <Button sx={{margin: "10px"}} variant="contained" type='submit'>Submit</Button>
      </Box>
    </>
  );
}
export default AddReststop