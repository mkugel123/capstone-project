import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import AddCategoryForm from './AddCategoryForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddListingForm({ addFormOpen, handleClose, onAddListingSubmit, categories, onAddCategorySubmit }){

  const [formData, setFormData] = useState({category_id: ''})
  const [errors, setErrors] = useState([])

  const menuItems = categories.map((category) => {
    return(
      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
    )
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(formData)
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch("/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((newListing) => onAddListingSubmit(newListing)).then(()=>handleClose());
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    })
  }

  const [addCategoryIsOpen, setAddCategoryIsOpen] = useState(false)

  return(
    <div>
      <Modal
        open={addFormOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button size="small" onClick={()=>setAddCategoryIsOpen(true)}>Add Category</Button>
          {addCategoryIsOpen ?
            <AddCategoryForm 
              onAddCategorySubmit={onAddCategorySubmit}
              setAddCategoryIsOpen={setAddCategoryIsOpen}
            /> : null
          }
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category_id}
                label="Category"
                onChange={handleChange}
                name='category_id'
              >
                {menuItems}
              </Select>
            </FormControl>
            <TextField fullWidth focused margin="normal" label="Title" name='title' value={formData.title} onChange={handleChange}/>
            <TextField fullWidth focused margin="normal" label="Image URL" name='image' value={formData.image} onChange={handleChange} />
            <TextField fullWidth focused margin="normal" label="Content" name='content' value={formData.content} onChange={handleChange} />
            <TextField fullWidth focused margin="normal" label="Price" name='price' value={formData.price} onChange={handleChange} />
            <Button size="big" type='submit'>Submit</Button>
          </form>
          {errors.length > 0 && (
            <ul style={{ color: "red" }}>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}          
        </Box>
      </Modal>
    </div>
  )
}

export default AddListingForm