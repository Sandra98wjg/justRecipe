import React, { useState } from "react";
import PrimarySearchAppBar from "../components/NavigationBar";
import RecipeCard from "../components/RecipeCard";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../assets/css/Home.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { ApiCall } from "../components/ApiCall";
import RandomRecipeModal from "../components/RandomRecipeModal";

// root page
export default function Home() {
  const modalOpen = false;
  let [whatsHotRecipes, setWhatsHotRecipes] = useState([]);
  let [newsFeedRecipes, setNewsFeedRecipes] = useState([]);
  const [newsFeedLength, setNewsFeedLength] = useState(0);

  // get what's hot and news feed recipes
  useEffect(() => {
    const getWhatsHot = () => {
      ApiCall("GET", `mainPage/whatshot`).then((data) => {
        setWhatsHotRecipes(data.recipes.slice(0, 4));
      });
    };
    const getNewsFeed = () => {
      if (localStorage.getItem("userId") !== null) {
        ApiCall(
          "GET",
          `mainPage/newsFeed/${localStorage.getItem("userId")}`
        ).then((data) => {
          setNewsFeedLength(data.recipes.length);
          setNewsFeedRecipes(data.recipes.slice(0, 4));
        });
      }
    };
    getWhatsHot();
    getNewsFeed();
  }, []);

  // display what's hot
  const WhatsHot = () => {
    const whatsHotMain = whatsHotRecipes.map((recipe) => {
      return (
        <Grid item xs={3} key={recipe.rid}>
          <RecipeCard
            id={recipe.rid}
            title={recipe.name}
            img={recipe.imgUrl}
            name={recipe.userName}
            types={recipe.mealType}
          />
        </Grid>
      );
    });
    return (
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: "80%",
          flexGrow: 1,
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <Grid container spacing={2}>
          {whatsHotMain}
        </Grid>
      </Paper>
    );
  };

  // display news feed
  const NewsFeed = () => {
    const NewsFeedMain = newsFeedRecipes.map((recipe) => {
      return (
        <Grid item xs={3} key={recipe.rid}>
          <RecipeCard
            id={recipe.rid}
            title={recipe.name}
            img={recipe.imgUrl}
            name={recipe.userName}
            types={recipe.mealType}
          />
        </Grid>
      );
    });
    return (
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: "80%",
          flexGrow: 1,
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <Grid container spacing={2}>
          {NewsFeedMain}
        </Grid>
      </Paper>
    );
  };

  return (
    <>
      <PrimarySearchAppBar />
      <div className="random-btn">
        <RandomRecipeModal randModalOpen={modalOpen} />
      </div>

      <div className="whats-hot">
        <h1 className="whats-hot-title">What's hot today</h1>
        <WhatsHot />
        <div>
          <Link to="/whatshot" className="more-on-home">
            <Button>More &gt;</Button>
          </Link>
        </div>
      </div>
      <div
        className="whats-hot"
        style={
          localStorage.getItem("userId") !== null
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <h1 className="whats-hot-title">Your news feed</h1>
        <NewsFeed />
        <div
          style={
            newsFeedLength > 4 ? { display: "block" } : { display: "none" }
          }
        >
          <Link to="/newsfeed" className="more-on-home news-feed">
            <Button color="primary">More &gt;</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
