import React from "react";
import PrimarySearchAppBar from "../components/NavigationBar";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../assets/css/Home.css";
import { ApiCall } from "../components/ApiCall";
import RecipePagination from "../components/RecipePagination";

export default function NewsFeed() {
  let [recipeNum, setRecipeNum] = useState(0);
  let [recipes, setRecipes] = useState([]);
  let [page, setPage] = useState(1);
  const recipesPerPage = 20;
  const thisPageRecipes = (page - 1) * recipesPerPage;

  // get news feed
  useEffect(() => {
    const getRecipeTotal = () => {
      ApiCall(
        "GET",
        `mainPage/newsFeed/${localStorage.getItem("userId")}`
      ).then((data) => {
        setRecipes(data.recipes);
        setRecipeNum(data.recipes.length);
      });
    };
    getRecipeTotal();
  }, []);

  // display news feed
  const RecipeTotal = () => {
    if (recipeNum > 0) {
      const recipeInfo = recipes
        .slice(thisPageRecipes, thisPageRecipes + recipesPerPage)
        .map((recipe) => {
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
            {recipeInfo}
          </Grid>
        </Paper>
      );
    } else {
      return <h1 className="no-result">No Result</h1>;
    }
  };

  return (
    <>
      <PrimarySearchAppBar />
      <div className="whats-hot">
        <h1 className="search-result-title">Your news feed</h1>
        <RecipeTotal />
      </div>
      <div>
        <RecipePagination
          setPage={setPage}
          page={page}
          totalPage={Math.ceil(recipeNum / recipesPerPage)}
        />
      </div>
    </>
  );
}
