import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function ListingCard({ listing, children }) {

  const {title, image, content, price} = listing

  return (
    <Card sx={{ maxWidth: 345, margin: "15px" }}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Typography variant="h6">
          ${price}
        </Typography>
      </CardContent>
      {children}
    </Card>
  );
}

export default ListingCard