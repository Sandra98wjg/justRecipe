import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineSharpIcon from "@material-ui/icons/AddCircleOutlineSharp";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// this components is the navigation bar

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: 100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    paddingLeft: "5%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  icon: {
    marginRight: 40,
  },
}));

export default function PrimarySearchAppBar() {
  const [isLogin, setIsLogin] = useState("Login");
  const navigate = useNavigate();

  // if user is login, set profile button to nav abr
  function checkLogin() {
    if (localStorage.getItem("userId") !== null) {
      setIsLogin("Profile");
    }
  }

  // jump to publish page
  function toPublish(e) {
    e.preventDefault();
    if (localStorage.getItem("userId") !== null) {
      navigate("/publish");
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.grow}>
      {/* style={{ backgroundColor: 'green', color: 'white' }} */}
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h5">
            Just Recipe
          </Typography>
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <IconButton className={classes.icon} color="inherit">
                <Badge overlap="rectangular" color="secondary">
                  <HomeIcon />
                </Badge>
                <p>Home</p>
              </IconButton>
            </div>

            <div onClick={toPublish}>
              <IconButton className={classes.icon} color="inherit">
                <Badge overlap="rectangular" color="secondary">
                  <AddCircleOutlineSharpIcon />
                </Badge>
                <p>Publish</p>
              </IconButton>
            </div>

            <div
              onClick={(e) => {
                e.preventDefault();
                navigate(`/profile/${localStorage.getItem("userId")}`);
              }}
            >
              <IconButton className={classes.icon} color="inherit">
                <Badge overlap="rectangular" color="secondary">
                  <AccountCircle />
                </Badge>
                <p>{isLogin}</p>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
