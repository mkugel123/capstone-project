import React from 'react';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
import { UserProvider } from "../context/user";
import { Route, Switch } from "react-router-dom"

function App() {

  // useEffect(() => {
  //   fetch("/me")
  //   .then(res => {
  //     if(res.ok){
  //       res.json().then(user => console.log(user))
  //     }
  //   })
  // },[])

  return (
    <div>
      <UserProvider>
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
      </UserProvider> 
    </div>
  );

}


export default App;
