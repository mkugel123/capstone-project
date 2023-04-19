import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [value, setValue] = React.useState(1);

  const { user } = React.useContext(UserContext)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={user ? user.username : "Hi"} disabled />
        <Tab label="Home" component={Link} to={"/"}/>
        <Tab label="Sign Up" component={Link} to={"/signup"}/>
        <Tab label="Log In" component={Link} to={"/login"}/>
      </Tabs>
    </>
  );
}