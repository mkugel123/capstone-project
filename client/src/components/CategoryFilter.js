import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CategoryFilter({categories, filterBy, setFilterBy }) {

  const handleChange = (event) => {
    setFilterBy(event.target.value);
  };

  const menuItems = categories.map((category) => {
    return(
      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
    )
  })

  return(
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filterBy}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          {menuItems}
        </Select>
      </FormControl>
    </>
  )
}

export default CategoryFilter