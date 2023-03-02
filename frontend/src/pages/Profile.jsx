import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PrimarySearchAppBar from "../components/NavigationBar";
import RecipeCard from "../components/RecipeCard";
import "../assets/css/Profile.css";
import ProfileHead from "../components/ProfileHead";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ApiCall } from "../components/ApiCall";
import RecipePagination from "../components/RecipePagination";

function Profile() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [recipeNum, setRecipeNum] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const recipesPerPage = 20;
  const params = useParams();

  useEffect(() => {
    // get all user info
    function getUserInfo() {
      if (localStorage.getItem("userId") === null) {
        navigate("/login/");
      } else {
        ApiCall(
          "GET",
          `user/getProfile/${params.uid}/${localStorage.getItem("userId")}`
        ).then((data) => {
          setName(data.name);
          setEmail(data.email);
          setRecipes(data.recipes);
          setId(params.uid);
          setRecipeNum(data.recipes.length);
          if (data.status === 1) {
            setFollowStatus(true);
          } else {
            setFollowStatus(false);
          }

          params.uid === localStorage.getItem("userId")
            ? setShowEdit(true)
            : setShowEdit(false);
        });
      }
    }
    getUserInfo();
  }, [params.uid, navigate]);

  // diaplay recipes
  const RecipeTotal = () => {
    const recipeInfo = recipes.slice((page - 1) * recipesPerPage,page * recipesPerPage)
      .map(recipe => {
      return(
        <Grid item xs={3} key={recipe.rid}>
          <RecipeCard
            key={recipe.id}
            id={recipe.rid}
            title={recipe.title}
            img={recipe.img}
            name={name}
            types={recipe.mealtype}
          />
        </Grid>
      )
    })
    return(
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
  };

  return (
    <>
      <PrimarySearchAppBar />
      <ProfileHead
        id={id}
        name={name}
        email={email}
        showEdit={showEdit}
        follow={followStatus}
      />
      <RecipeTotal />
      <RecipePagination
        setPage={setPage}
        page={page}
        totalPage={Math.ceil(recipeNum / recipesPerPage)}
      />
    </>
  );
}

export default Profile;
