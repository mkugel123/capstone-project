import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function AddCategoryForm({ onAddCategorySubmit, setAddCategoryIsOpen }){

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState([])

  function handleChange(e) {
    setFormData({name: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch('/categories', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((newCategory) => onAddCategorySubmit(newCategory)).then(()=>setAddCategoryIsOpen(false));
      } else {
        res.json().then((errorData) => setErrors(errorData.errors));
      }
    })
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth focused margin="normal" label="New Category" value={formData.name} onChange={handleChange}/>
        <Button size="big" type='submit'>Add</Button>
      </form>
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}          
    </div>
  )
}

export default AddCategoryForm