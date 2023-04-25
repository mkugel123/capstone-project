import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from '@mui/material';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [value, setValue] = React.useState(1);

  const { user, setUser } = React.useContext(UserContext)

  function handleLogOut() {
    fetch('/logout', {method: 'DELETE'})
    .then(setUser(null))
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={user ? user.username : "Hi"} disabled />
        <Tab label="Home" component={Link} to={"/"}/>
        {user ? <Tab label="Log Out" component={Button} onClick={handleLogOut}/> : <Tab label="Log In" component={Link} to={"/login"}/>}
      </Tabs>
    </>
  );
}