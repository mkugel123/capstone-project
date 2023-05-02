import React, {useState, useEffect, useContext} from 'react';
import ListingCard from './ListingCard';
import { Stack, CardActions, Button } from '@mui/material';
import CategoryFilter from './CategoryFilter';
import EditListingForm from './EditListingForm';
import { UserContext } from '../context/user';


function MyListings({ categories, setCategories, listings, setListings }) {

  const { user } = useContext(UserContext)

  const myListings = listings.filter((listing) => listing.user_id === user.id);

  //state for selected category
  const [filterBy, setFilterBy] = useState('All')

  const [editFormOpen, setEditFormOpen] = useState(false)
  const [selectedListingId, setSelectedListingId] = useState(null)

  function handleEditFormOpen(id) {
    setSelectedListingId(id)
    setEditFormOpen(true)
  }

  function handleEditFormClose() {
    setEditFormOpen(false);
  }

  function handleEditListingSubmit(updatedListing) {
    const updatedListings = listings.map((listing) => {
      if(listing.id === updatedListing.id) {
        return updatedListing
      } else {
        return listing
      }
    })
    setListings(updatedListings)
    setEditFormOpen(false)
  }

  //define listings to diplay based off of selected category
  const listingsToDisplay = myListings.filter((listing) => {
    if (filterBy === "All") {
      return true;
    } else {
      return listing.category.id === filterBy;
    }
  });

  //create listing cards with filtered listings
  const listingCards = listingsToDisplay.map((listing) => {
    return(
      <ListingCard
        key={listing.content}
        listing={listing}
      >
        <CardActions>
          <Button size="small" onClick={()=>handleEditFormOpen(listing.id)}>Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </ListingCard>
    )
  })

  return (
    <>
       <CategoryFilter 
        categories={categories}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <Stack direction="row" useFlexGap flexWrap="wrap">
        {listingCards}
      </Stack>
      {editFormOpen ? 
        <EditListingForm
          editFormOpen={editFormOpen}
          handleClose={handleEditFormClose}
          listingId={selectedListingId}
          onEditListingSubmit={handleEditListingSubmit}
        /> : null
      }
      
    </>
  );
}

export default MyListings