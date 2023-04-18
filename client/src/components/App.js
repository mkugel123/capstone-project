import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
import { UserProvider } from "../context/user";

function App() {
  return (
    <div>
      <UserProvider>
        <NavBar/>
        <SignUp />
        <SignIn />
      </UserProvider> 
    </div>
  );
}

export default App;
