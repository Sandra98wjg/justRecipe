import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// search part in nav bar
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: "10px",
    width: "10%",
    [theme.breakpoints.up("sm")]: {
      // marginLeft: theme.spacing(35),
      width: "700px",
      height: "50px",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(2, 2, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [item, setItem] = useState("");
  const [searchOption, setSearchOption] = React.useState("all");

  const handleChange = (event) => {
    setSearchOption(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 150 }} className="search-option">
        <FormControl sx={{ color: "#ffffff" }} fullWidth>
          <InputLabel sx={{ color: "#ffffff" }} id="demo-simple-select-label">
            Search Option
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            sx={{ color: "#ffffff" }}
            id="demo-simple-select"
            value={searchOption}
            label="Option"
            onChange={handleChange}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"recipeTitle"}>Recipe Title</MenuItem>
            <MenuItem value={"providerName"}>Provider Name</MenuItem>
            <MenuItem value={"ingredients"}>Ingredients</MenuItem>
            <MenuItem value={"method"}>Method</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          type="text"
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setItem(e.target.value)}
          onKeyUp={(e) => {
            e.preventDefault();
            if (e.keyCode === 13 && e.target.value.length > 0) {
              window.location.href = `/search?${searchOption}=${item}`;
            }
          }}
        />
      </div>
    </>
  );
}
