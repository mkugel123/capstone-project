import React, { useState } from 'react';
import ListingCard from './ListingCard';
import { Stack } from '@mui/material';
import CategoryFilter from './CategoryFilter';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'


function Home({ categories, listings, setReviews, setSelectedUserId }) {


  function handleClick(user) {

    console.log(user.id)
    setSelectedUserId(user.id)
    setReviews(user.reviews)
  }

  const [filterBy, setFilterBy] = useState('All')

  const listingsToDisplay = listings.filter((listing) => {
    if (filterBy === "All") {
      return true;
    } else {
      return listing.category_id === filterBy;
    }
  });

  const listingCards = listingsToDisplay.map((listing) => {
    return(
      <ListingCard
        key={listing.id}
        listing={listing}
      >
        <Avatar component={Link} to={"/reviews"} onClick={()=>handleClick(listing.user)}>
          {listing.user.username[0]}
        </Avatar>
      </ListingCard>
    )
  })

  return (
    <>
      <h1 style={{textAlign: "center"}}>Home</h1>
      <CategoryFilter 
        categories={categories}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <Stack direction="row" useFlexGap flexWrap="wrap">
        {listingCards}
      </Stack>
    </>
  );
}

export default Home