import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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

function PublishForm({ submit }) {
  const [recipeName, setRecipeName] = React.useState("");
  const [mealType, setMealType] = useState("");
  const [ingredients, setIngredients] = React.useState([]);
  const [methods, setMethods] = React.useState([]);
  const [image, setImage] = React.useState("");

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
      let stringIngredients = ""
      for (let i = 0; i < ingredients.length; i++) {
          stringIngredients += ingredients[i].ingredient
          stringIngredients += "#"
      }
      let stringMethods = ""
      for (let i = 0; i < methods.length; i++) {
          stringMethods += methods[i].method
          stringMethods += "#"
      }
      if (!image) {
          submit(recipeName, stringIngredients, stringMethods,mealType, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=');
      } else {
          image.then(data => {
              submit(recipeName, stringIngredients, stringMethods,mealType, data);
          });
      }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Grid container spacing={5} pt={10} pb={50}>
          <Grid item xs={12}>
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
                  setImage(fileToDataUrl(e.target.files[0]));
                  console.log(image);
                }}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography pb={3} variant="h5">
              Recipe Name
            </Typography>
            <TextField
              id="recipe-name"
              className="inputForm"
              fullWidth
              label="Recipe Name"
              variant="outlined"
              onChange={(e) => setRecipeName(e.target.value)}
            >
              Recipe name
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography pb={3} variant="h5">
              Meal Type
            </Typography>
            <TextField
              id="meal-type"
              className="inputForm"
              fullWidth
              label="Meal Type"
              variant="outlined"
              onChange={(e) => setMealType(e.target.value)}
            >
              Meal Type
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography pb={3} variant="h5">
              Ingredients
            </Typography>
            <Grid container spacing={3}>
              {ingredients.map((ingredient, index) => (
                <Grid item key={ingredient.id} xs={12}>
                  <TextField
                    key={ingredient.id}
                    id={ingredient.id}
                    className="inputForm"
                    fullWidth
                    label="ingredient"
                    variant="outlined"
                    pb={3}
                    onChange={(e) => {
                      ingredient.ingredient = e.target.value;
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
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

          <Grid item xs={12}>
            <Typography pb={3} variant="h5">
              Methods
            </Typography>
            <Grid container spacing={3}>
              {methods.map((method, index) => (
                <Grid item key={method.id} xs={12}>
                  <TextField
                    key={method.id}
                    id={method.id}
                    className="inputForm"
                    fullWidth
                    label="step"
                    variant="outlined"
                    pb={3}
                    onChange={(e) => {
                      method.method = e.target.value;
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
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
          <Grid item xs={12}>
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

export default PublishForm;
