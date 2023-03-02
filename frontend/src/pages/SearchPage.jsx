import React from "react";
import PrimarySearchAppBar from "../components/NavigationBar";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../assets/css/Home.css";
import { ApiCall } from "../components/ApiCall";
import RecipePagination from "../components/RecipePagination";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  let [recipeNum, setRecipeNum] = useState(0);
  let [recipes, setRecipes] = useState([]);
  let [searchString, setSearchString] = useState("");
  let [page, setPage] = useState(1);
  const recipesPerPage = 20;
  const thisPageRecipes = (page - 1) * recipesPerPage;

  // check search operation
  useEffect(() => {
    const getRecipeTotal = () => {
      if (searchParams.get("all") !== null) {
        setSearchString(searchParams.get("all"));
        ApiCall("GET", `searchRecipe/All/${searchParams.get("all")}`).then(
          (data) => {
            setRecipes(data.recipes);
            setRecipeNum(data.recipes.length);
          }
        );
      } else if (searchParams.get("recipeTitle") !== null) {
        setSearchString(searchParams.get("recipeTitle"));
        ApiCall(
          "GET",
          `searchRecipe/RecipeTitle/${searchParams.get("recipeTitle")}`
        ).then((data) => {
          setRecipes(data.recipes);
          setRecipeNum(data.recipes.length);
        });
      } else if (searchParams.get("providerName") !== null) {
        setSearchString(searchParams.get("providerName"));
        ApiCall(
          "GET",
          `searchRecipe/ProviderName/${searchParams.get("providerName")}`
        ).then((data) => {
          setRecipes(data.recipes);
          setRecipeNum(data.recipes.length);
        });
      } else if (searchParams.get("ingredients") !== null) {
        setSearchString(searchParams.get("ingredients"));
        ApiCall(
          "GET",
          `searchRecipe/Ingredient/${searchParams.get("ingredients")}`
        ).then((data) => {
          setRecipes(data.recipes);
          setRecipeNum(data.recipes.length);
        });
      } else if (searchParams.get("method") !== null) {
        setSearchString(searchParams.get("method"));
        ApiCall(
          "GET",
          `searchRecipe/Method/${searchParams.get("method")}`
        ).then((data) => {
          setRecipes(data.recipes);
          setRecipeNum(data.recipes.length);
        });
      }
    };
    getRecipeTotal();
  }, [searchParams]);

  // display search result
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
        <h1 className="search-result-title">Result For {searchString}</h1>
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
