import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import Modal from '@mui/material/Modal';

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

function EditListingForm({ editFormOpen, handleClose, listingId, onEditListingSubmit }){

  console.log("Edit Form Rendered")

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetch(`/listings/${listingId}`)
    .then(res => res.json())
    .then(listingData => setFormData(listingData))
  }, [listingId])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`/listings/${listingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((updatedListing) => onEditListingSubmit(updatedListing));
      } else {
        res.json().then((errorData) => setErrors(errorData.errors));
      }
    })
  }

  return(
    <div>
      <Modal
        open={editFormOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
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

export default EditListingForm