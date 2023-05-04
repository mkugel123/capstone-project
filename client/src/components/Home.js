import React, { useState } from 'react';
import ListingCard from './ListingCard';
import { Stack } from '@mui/material';
import CategoryFilter from './CategoryFilter';

function Home({ listings, categories }) {

  const [filterBy, setFilterBy] = useState('All')

  const listingsToDisplay = listings.filter((listing) => {
    if (filterBy === "All") {
      return true;
    } else {
      return listing.category.id === filterBy;
    }
  });

  const listingCards = listingsToDisplay.map((listing) => {
    return(
      <ListingCard
        key={listing.content}
        listing={listing}
      />
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