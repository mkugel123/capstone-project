import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function ReststopCard({reststop, onReststopDelete, onReststopEdit}) {

  const {has_gas, has_restroom, has_store, confirmations} = reststop

  const [isEditable, setIsEditable] = useState(false)
  
  const [formData, setFormData] = useState({
    has_gas: has_gas,
    has_restroom: has_restroom,
    has_store: has_store
  })

  const [errors, setErrors] = useState([])

  function handleEdit() {
    setIsEditable(true)
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    })
    console.log(formData)
  }
  
  function handleDelete() {
    fetch(`/reststops/${reststop.id}`, {method: 'DELETE'})
    .then(res => {
      if (res.ok) {
        res.json().then(deletedReststop => onReststopDelete(deletedReststop))
      } else {
        res.json().then(errorData => setErrors(errorData.errors))
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`/reststops/${reststop.id}`, {
      method: 'PATCH',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then(res => {
      if (res.ok) {
        res.json().then(updatedReststop => onReststopEdit(updatedReststop))
      } else {
        res.json().then(errorData => setErrors(errorData.errors))
      }
    })
    setIsEditable(false)
  }


  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" >
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography variant="h5" component="div">
              Near Exit {reststop.nearest_exit} 
            </Typography>
            <Typography variant="body2">
              <Checkbox name="has_gas" onChange={handleChange} {...label} checked={formData.has_gas} disabled={isEditable ? false : true} />
              Gas
              <br/>
              <Checkbox name="has_restroom" onChange={handleChange} {...label} checked={formData.has_restroom} disabled={isEditable ? false : true}  />
              Restroom
              <br/>
              <Checkbox name="has_store" onChange={handleChange} {...label} checked={formData.has_store} disabled={isEditable ? false : true}  />
              Convenience Store
              <br/>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleEdit}>Edit</Button>
            <Button size="small" onClick={handleDelete}>Delete</Button>
            <Button size="small">Confirm {confirmations}</Button>
            <br/>
            {isEditable ? <Button type='submit' size="small">Submit</Button> : null}
          </CardActions>
        </form>
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </Card>
    </Box>
  );
}

export default ReststopCard