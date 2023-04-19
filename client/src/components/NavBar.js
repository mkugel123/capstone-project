import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { UserContext } from '../context/user';

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
        <Tab label="Active" />
        <Tab label="Disabled" />
        <Tab label="Active" />
      </Tabs>
    </>
  );
}