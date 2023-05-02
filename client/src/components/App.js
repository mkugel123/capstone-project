import React, { useEffect, useState } from 'react';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
import MyListings from './MyListings';
import { UserContext } from "../context/user";
import { Route, Switch } from "react-router-dom"

function App() {

  const { setUser } = React.useContext(UserContext)

  useEffect(() => {
    fetch("/me")
    .then(res => {
      if(res.ok){
        res.json().then(user => setUser(user))
      }
    })
  },[setUser])

  const [listings, setListings] = useState([])

  useEffect(() => {
    fetch("/listings")
    .then(res => res.json())
    .then(listings => setListings(listings))
  }, [])

  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("/categories")
    .then(res => res.json())
    .then(categories => setCategories(categories))
  }, [setCategories])


  return (
    <div>
        <NavBar/>
        <Switch>
          <Route path="/" exact>
            <Home 
              listings={listings}
              categories={categories}
            />
          </Route>
          <Route path="/my_listings" exact>
            <MyListings 
              listings={listings}
              setListings={setListings}
              categories={categories}
              setCategories={setCategories}
            />
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
