import { useNavigate } from "react-router-dom";
import { ApiCall } from "../components/ApiCall";
import { useParams } from "react-router-dom";
import RecipeEditForm from "../components/RecipeEditForm";
import PrimarySearchAppBar from "../components/NavigationBar";

function RecipeEdit() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <>
      <PrimarySearchAppBar />
      <RecipeEditForm
        rid={params.rid}
        submit={async (recipeName, ingredients, methods, mealType, image) => {
          let body = {
            imgUrl: image,
            ingredient: ingredients,
            mealType: mealType,
            method: methods,
            name: recipeName,
          };
          ApiCall("PUT", `updateRecipe/${params.rid}`, body)
            .then((data) => {
              navigate("/");
            })
            .catch(alert);
          // window.location.href = `/recipes/${params.rid}`
        }}
      />
    </>
  );
}

export default RecipeEdit;
