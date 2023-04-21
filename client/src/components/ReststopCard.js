import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function ReststopCard({reststop}) {

  const {has_gas, has_restroom, has_store} = reststop

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Near Exit {reststop.nearest_exit} 
          </Typography>
          <Typography variant="body2">
            <Checkbox {...label} checked={has_gas ? true : false} disabled />
            Gas
            <br/>
            <Checkbox {...label} checked={has_restroom ? true : false} disabled  />
            Restroom
            <br/>
            <Checkbox {...label} checked={has_store ? true : false} disabled  />
            Convenience Store
            <br/>
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </Box>
  );
}

export default ReststopCard