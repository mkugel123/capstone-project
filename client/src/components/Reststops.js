import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReststopCard from './ReststopCard';

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

function Reststops({ open, handleClose, reststops, onReststopDelete, onReststopEdit }){

  const listOfReststops = reststops.map((reststop) => {
    return(
      <ReststopCard 
        key={reststop.id}
        reststop={reststop}
        onReststopDelete={onReststopDelete}
        onReststopEdit={onReststopEdit}
      />
    )
  })

  return(
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" component="div">
            {/* {highwayName}: */}
          </Typography>
          {listOfReststops}
        </Box>
      </Modal>
    </div>
  )
}

export default Reststops