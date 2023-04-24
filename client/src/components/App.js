import React, { useEffect} from 'react';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
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

  return (
    <div>
        <NavBar/>
        <Switch>
          <Route path="/" exact>
            <Home />
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
