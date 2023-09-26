import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import AddReviewForm from './AddReviewForm';


function Reviews({reviews, onAddReviewSubmit, selectedUserId}) {

  const [addReviewFormOpen, setAddReviewFormOpen] = useState(false)

  function handleAddReviewFormClose() {
    setAddReviewFormOpen(false)
  }

  console.log(reviews)

  const listOfReviews = reviews.length > 0
  ? reviews.map((review) => {
      return(
        <Paper elevation={1} sx={{maxWidth: 500, margin: 5}} key={review.signature}>
          <Typography variant="h6" gutterBottom>{review.item}</Typography>
          <Typography variant="body2" gutterBottom>{review.content}</Typography>
          <Typography variant="overline">{review.signature}</Typography>
        </Paper>
      )
    })
  : "no reviews yet";

  return (
    <>
      <Button sx={{margin: "10px"}} variant='contained' size="large" onClick={()=>setAddReviewFormOpen(true)}>Add Review</Button>
      {listOfReviews}
      {addReviewFormOpen ? 
        <AddReviewForm
          addReviewFormOpen={addReviewFormOpen}
          handleClose={handleAddReviewFormClose}
          selectedUserId={selectedUserId}
          onAddReviewSubmit={onAddReviewSubmit}
        /> : null
      }
    </>
  );
}

export default Reviews