// random recipe
import randIngs from "../RandomRecipeIngredients.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrimarySearchAppBar from "../components/NavigationBar";
import "../assets/css/Profile.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function RandomRecipe() {
    const [base, setBase] = useState('');
    const [toppings, setToppings] = useState([]);
    const [finish, setFinish] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const params = useParams();
    const recipeType = params.type;


    useEffect(() => {
      const getRecipePieces = () => {
        let ings = {}

        // retrieve different ingredients lists for different types of food
        if (recipeType === 'salad') {
          ings = randIngs.saladIngredients;
          setImgSrc(require('../assets/salad.png'))
        } else if (recipeType === 'sandwich') {
          ings = randIngs.sandwichIngredients;
          setImgSrc(require('../assets/sandwich.png'))
        } else {
          ings = randIngs.soupIngredients;
          setImgSrc(require('../assets/soup.jpg'))
        }

        // generate random numbers to select random ingredients
        let baseIndex = getRandomInt(ings.base.length);
        let toppingIndices = [getRandomInt(ings.toppings.length),
                         getRandomInt(ings.toppings.length),
                         getRandomInt(ings.toppings.length)];
        let finishIndex = getRandomInt(ings.finish.length);

        // set state variables to randomly generated ingredients
        setBase(ings.base[baseIndex]);
        setToppings([ings.toppings[toppingIndices[0]],
                     ings.toppings[toppingIndices[1]],
                     ings.toppings[toppingIndices[2]]]);
        setFinish(ings.finish[finishIndex]);
      };
    getRecipePieces();
  }, [recipeType]);
  return (
    <>
      <PrimarySearchAppBar />
      <Container component="main" maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={5}
          pt={15}
          pb={50}
        >
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Grid container spacing={5} columnSpacing={15} pb={5}>
                <Grid item xs={5}>
                  <Typography p={10} variant="h1">
                    {"Your random " + recipeType}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Box
                    component="img"
                    maxWidth="80%"
                    width="80%"
                    src={imgSrc}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Typography p={4} pt={3} pb={1} variant="h3">
                Start with:
              </Typography>
              <List sx={{ width: "100%", maxWidth: "360" }}>
                <ListItem>
                  <ListItemIcon>
                    <ChevronRightIcon pb={1} />
                  </ListItemIcon>
                  <ListItemText primary={base} />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Typography p={4} pt={3} pb={1} variant="h3">
                Add:
              </Typography>
              <List sx={{ width: "100%", maxWidth: "360" }}>
                {toppings.map((t, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ChevronRightIcon pb={1} />
                    </ListItemIcon>
                    <ListItemText primary={t} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Typography p={4} pt={3} pb={1} variant="h3">
                Finish with:{" "}
              </Typography>
              <List sx={{ width: "100%", maxWidth: "360" }}>
                <ListItem>
                  <ListItemIcon>
                    <ChevronRightIcon pb={1} />
                  </ListItemIcon>
                  <ListItemText primary={finish} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default RandomRecipe;
