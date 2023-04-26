import React, { useEffect, useState } from 'react';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
import AddReststop from './AddReststop';
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

  const [highways, setHighways] = useState([])

  useEffect(() => {
    fetch("/highways")
    .then(res => res.json())
    .then(highways => setHighways(highways))
  },[])

  function handleAddHighwaySubmit(newHighway) {
    setHighways([...highways, newHighway])
  }

  return (
    <div>
        <NavBar/>
        <Switch>
          <Route path="/" exact>
            <Home 
              highways={highways}
            />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <SignIn />
          </Route>
          <Route path="/addreststop" exact>
            <AddReststop 
              highways={highways}
              onAddHighwaySubmit={handleAddHighwaySubmit}
            />
          </Route>
        </Switch>
    </div>
  );

}


export default App;
