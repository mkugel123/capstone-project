import React from 'react';
import ListingCard from './ListingCard';
import { Stack, CardActions, Button } from '@mui/material';
import { UserContext } from '../context/user';



function MyListings({ listings }) {

  const { user } = React.useContext(UserContext)

  let myListings

  if(user){
    myListings = listings.filter((listing) => listing.user_id === user.id)
  } else {
    myListings = listings
  }

  const listingCards = myListings.map((listing) => {
    return(
      <ListingCard
        key={listing.content}
        listing={listing}
      >
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </ListingCard>
    )
  })

  return (
    <Stack direction="row" useFlexGap flexWrap="wrap">
      {listingCards}
    </Stack>
  );
}

export default MyListings