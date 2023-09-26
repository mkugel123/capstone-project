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

function AddReviewForm({ addReviewFormOpen, handleClose, onAddReviewSubmit, selectedUserId}){

  const [formData, setFormData] = useState({user_id: selectedUserId})
  const [errors, setErrors] = useState([])


  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((newReview) => onAddReviewSubmit(newReview)).then(()=>handleClose());
      } else {
        response.json().then((errorData) => setErrors(errorData.errors));
      }
    })
  }

  return(
    <div>
      <Modal
        open={addReviewFormOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth focused margin="normal" label="Item Purchased" name='item' value={formData.item} onChange={handleChange}/>
            <TextField fullWidth focused margin="normal" label="Review" name='content' value={formData.content} onChange={handleChange} />
            <TextField fullWidth focused margin="normal" label="Signature" name='signature' value={formData.signature} onChange={handleChange} />
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

export default AddReviewForm