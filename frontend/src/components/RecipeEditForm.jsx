import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ApiCall } from "../components/ApiCall";
import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

function fileToDataUrl(file) {
  const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const valid = validFileTypes.find((type) => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error("provided file is not a png, jpg or jpeg image.");
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

function RecipeEditForm({ submit, rid }) {
  const [recipeName, setRecipeName] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [methods, setMethods] = useState([]);
  const [image, setImage] = useState("");
  const [mealType, setMealType] = useState([]);

  const addIngredient = () => {
    const temp = [...ingredients];
    temp.push({ id: temp.length.toString(), ingredient: "Ingredient" });
    setIngredients(temp);
  };

  const addMethod = () => {
    const temp = [...methods];
    temp.push({ id: temp.length.toString(), method: "Step" });
    setMethods(temp);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (recipeName !== "") {
      let stringIngredients = "";
      for (let i = 0; i < ingredients.length; i++) {
        stringIngredients += ingredients[i].ingredient;
        stringIngredients += "#";
      }
      let stringMethods = "";
      for (let i = 0; i < methods.length; i++) {
        stringMethods += methods[i].method;
        stringMethods += "#";
      }
      if (!image) {
        submit(
          recipeName[0],
          stringIngredients,
          stringMethods,
          mealType[0],
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="
        );
      } else {
        submit(
          recipeName[0],
          stringIngredients,
          stringMethods,
          mealType[0],
          image
        );
      }
    } else {
      alert("your title should not be null!");
    }
  };

  const removeIngredient = (id) => {
    const temp = [...ingredients];
    temp.splice(id, 1);
    for (let i = 0; i < temp.length; i++) {
      temp[i].id = i.toString();
    }
    setIngredients(temp);
  };

  const removeMethod = (id) => {
    var temp = [...methods];
    temp.splice(id, 1);
    for (let i = 0; i < temp.length; i++) {
      temp[i].id = i.toString();
    }
    setMethods(temp);
  };

  useEffect(() => {
    const getRecipeInfo = () => {
      ApiCall(
        "GET",
        `recipe/getRecipe/${rid}/${localStorage.getItem("userId")}`
      ).then((data) => {
        let temp = [];
        temp.push(data.name);
        setRecipeName(temp);
        setImage(data.imgurl);
        let tempMealType = [];
        tempMealType.push(data.mealtype);
        setMealType(tempMealType);
        let ms = data.method.slice(0, -1).split("#");
        temp = [];
        for (let i = 0; i < ms.length; i++) {
          temp.push({ method: ms[i], id: i });
        }
        setMethods(temp);
        let is = data.ingredient.slice(0, -1).split("#");
        temp = [];
        for (let i = 0; i < is.length; i++) {
          temp.push({ ingredient: is[i], id: i });
        }
        setIngredients(temp);
      });
    };
    getRecipeInfo();
  }, [rid]);

  return (
    <>
      <Container component="main" maxWidth="md">
        <Grid container spacing={5} pt={10} pb={50}>
          <Grid item md={12}>
            <Button
              sx={{
                borderRadius: 3,
                color: "#888888",
                backgroundColor: "#ffffff",
                fontSize: 18,
                height: 250,
                "&:hover": {
                  color: "#666666",
                  backgroundColor: "#dddddd",
                },
              }}
              variant="contained"
              component="label"
              fullWidth
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={(e) => {
                  fileToDataUrl(e.target.files[0]).then((data) => {
                    setImage(data);
                  });
                }}
              />
            </Button>
          </Grid>
          <Grid item md={12}>
            <Typography pb={3} variant="h5">
              Recipe Name
            </Typography>
            {recipeName.map((name, index) => (
              <TextField
                id="recipe-name"
                className="inputForm"
                fullWidth
                label="Recipe Name"
                defaultValue={name}
                key={index}
                variant="outlined"
                onChange={(e) => {
                  setRecipeName([e.target.value]);
                }}
              ></TextField>
            ))}
          </Grid>
          <Grid item md={12}>
            <Typography pb={3} variant="h5">
              Meal Type
            </Typography>
            {mealType.map((name, index) => (
              <TextField
                id="meal-type"
                className="inputForm"
                fullWidth
                label="Meal Type"
                defaultValue={name}
                key={index}
                variant="outlined"
                onChange={(e) => {
                  setMealType([e.target.value]);
                }}
              ></TextField>
            ))}
          </Grid>
          <Grid item md={12}>
            <Typography pb={3} variant="h5">
              Ingredients
            </Typography>
            <Grid container spacing={3}>
              {ingredients.map((ingredient, index) => (
                <Grid item key={ingredient.id} md={12}>
                  <TextField
                    key={ingredient.id}
                    className="inputForm"
                    fullWidth
                    label="Ingredient"
                    defaultValue={ingredient.ingredient}
                    variant="outlined"
                    pb={3}
                    onChange={(e) => {
                      ingredient.ingredient = e.target.value;
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => {
                      removeIngredient(ingredient.id);
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              ))}
              <Grid item md={12}>
                <Button
                  sx={{ borderRadius: 3 }}
                  mt={2}
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    addIngredient();
                  }}
                >
                  Add Ingredient
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <Typography pb={3} variant="h5">
              Methods
            </Typography>
            <Grid container spacing={3}>
              {methods.map((method, index) => (
                <Grid item key={method.id} md={12}>
                  <TextField
                    key={method.id}
                    className="inputForm"
                    fullWidth
                    label="Method"
                    defaultValue={method.method}
                    variant="outlined"
                    pb={3}
                    onChange={(e) => {
                      method.method = e.target.value;
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => {
                      removeMethod(method.id);
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              ))}
              <Grid item md={12}>
                <Button
                  sx={{ borderRadius: 3 }}
                  mt={2}
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    addMethod();
                  }}
                >
                  Add Step
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Button
              sx={{ borderRadius: 3 }}
              variant="contained"
              fullWidth
              style={{ height: 70 }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default RecipeEditForm;
