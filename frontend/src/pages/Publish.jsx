import React from "react";

import PublishForm from "../components/PublishForm";
import { useNavigate } from "react-router-dom";
import { ApiCall } from "../components/ApiCall";
import PrimarySearchAppBar from "../components/NavigationBar";

function Publish() {
  const navigate = useNavigate();
  return (
    <>
      <PrimarySearchAppBar />
      <PublishForm
        submit={async (recipeName, ingredients, methods, mealType, image) => {
          let body = {
            name: recipeName,
            ingredient: ingredients,
            mealType: mealType,
            method: methods,
            imgUrl: image,
          };
          ApiCall(
            "POST",
            `recipe/createRecipe/${localStorage.getItem("userId")}`,
            body
          )
            .then((data) => {
              navigate("/");
            })
            .catch(alert);
        }}
      />
    </>
  );
}

export default Publish;
