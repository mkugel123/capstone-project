import React, { useContext, useEffect, useState } from 'react';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
import MyListings from './MyListings';
import { UserContext } from "../context/user";
import { Route, Switch } from "react-router-dom"

function App() {

  const [categories, setCategories] = useState([])
  const [listings, setListings] = useState([])

  useEffect(() => {
    fetch("/categories")
    .then(res => res.json())
    .then(categories => setCategories(categories))
  }, [])

  useEffect(() => {
    const allListings = categories.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue.listings],
      []
    )
    setListings(allListings)
  }, [categories])

  const { setUser, user } = useContext(UserContext)

  useEffect(() => {
    fetch("/me")
    .then(res => {
      if(res.ok){
        res.json().then(user => setUser(user))
      }
    })
  }, [])

  function handleAddCategorySubmit(newCategory) {
    const updatedCategories = [...categories, newCategory]
    setCategories(updatedCategories)
  }

  function handleAddListingSubmit(newListing) {
    const updatedListings = [...listings, newListing]
    setListings(updatedListings)
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
  }

  function handleListingDelete(deletedListing) {
    setListings(listings.filter(listing => listing.id !== deletedListing.id))
  }

  return (
    <div>
        <NavBar/>
        <Switch>
          <Route path="/" exact>
            <Home 
              categories={categories}
              listings={listings}
            />
          </Route>
          <Route path="/my_listings" exact>
            {user ? 
              <MyListings
                categories={categories}
                setCategories={setCategories}
                onEditListingSubmit={handleEditListingSubmit}
                onAddListingSubmit={handleAddListingSubmit}
                onAddCategorySubmit={handleAddCategorySubmit}
                onListingDelete={handleListingDelete}
              /> : null
            }
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <SignIn />
          </Route>
        </Switch>
    </div>
  );

}


export default App;
