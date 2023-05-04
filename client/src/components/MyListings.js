import React, {useContext, useState, useEffect} from 'react';
import ListingCard from './ListingCard';
import { Stack, CardActions, Button } from '@mui/material';
import CategoryFilter from './CategoryFilter';
import EditListingForm from './EditListingForm';
import AddListingForm from './AddListingForm';
import { UserContext } from '../context/user';

function MyListings({ categories, setCategories, listings, setListings }) {

  const {user} = useContext(UserContext)

  

  // const myListings = listings.filter(listing=>user.id === listing.user_id))

  //state for user specific listings and categories
  const [myListings, setMyListings] = useState([])
  
  useEffect(() => {
    if (user) {
      const filtered = listings.filter(listing=>user.id === listing.user_id);
      setMyListings(filtered);
    }
  }, [user, listings]);

  //state for selected category
  const [filterBy, setFilterBy] = useState('All')

  //state for edit form modal
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [selectedListingId, setSelectedListingId] = useState(null)

  //state for add form modal
  const [addFormOpen, setAddFormOpen] = useState(false)

  //functions fo open and close edit form modal
  function handleEditFormOpen(id) {
    setSelectedListingId(id)
    setEditFormOpen(true)
  }

  function handleEditFormClose() {
    setEditFormOpen(false);
  }

  //updates state of all listings to include updated listing
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

  //function to open close add form modal
  function handleAddFormClose() {
    setAddFormOpen(false);
  }

  //updates state of all listings to include new listing
  function handleAddListingSubmit(newListing) {
    const updatedListings = [...listings, newListing]
    setListings(updatedListings)
    setAddFormOpen(false)
  }

  function handleAddCategorySubmit(newCategory) {
    const updatedCategories = [...categories, newCategory]
    setCategories(updatedCategories)
  }

  function handleListingDelete(id) {
    fetch(`/listings/${id}`, {method: 'DELETE'})
    .then(res=>res.json())
    .then(deletedListing=>setListings(listings.filter(listing => listing.id !== deletedListing.id)))
  }
  // setListings(listings.filter(listing => listing.id !== deletedListing.id))

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
          <Button size="small" onClick={()=>handleListingDelete(listing.id)}>Delete</Button>
        </CardActions>
      </ListingCard>
    )
  })

  return (
    <>
      <h1 style={{textAlign: "center"}}>My Listings</h1>
      <CategoryFilter 
        categories={categories}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <Button sx={{margin: "10px"}} variant='contained' size="large" onClick={()=>setAddFormOpen(true)}>Add Listing</Button>
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
      {addFormOpen ? 
        <AddListingForm
          categories={categories}
          setCategories={setCategories}
          addFormOpen={addFormOpen}
          handleClose={handleAddFormClose}
          onAddListingSubmit={handleAddListingSubmit}
          onAddCategorySubmit={handleAddCategorySubmit}
        /> : null
      }
    </>
  );
}

export default MyListings