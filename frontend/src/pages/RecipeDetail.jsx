import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiCall } from "../components/ApiCall";
import { useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../components/NavigationBar";
import "../assets/css/Profile.css";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import RecipeCard from "../components/RecipeCard";
import Notebook from "../components/Notebook";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function RecipeDetail() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [methods, setMethods] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [recipeCreatorId, setRecipeCreatorId] = useState("");
  const [rid, setRid] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [recipeCreatorName, setRecipeCreatorName] = useState("");
  const params = useParams();
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [createTime, setCreateTime] = useState("");
  const [showNotebook, setShowNotebook] = useState(false);
  const [notebookContents, setNotebookContents] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [mealType, setMealType] = useState("");

  const postComment = (e) => {
    e.preventDefault();
    if (localStorage.getItem("userId") === null) {
      navigate("/login");
    } else {
      ApiCall("POST", `comment/newComment`, {
        content: newComment,
        rid: rid,
        uid: localStorage.getItem("userId"),
      }).then((d) => {
        window.location.reload();
      });
    }
  };

  const goToCreator = () => {
    setModalOpen(false);
    navigate(`/profile/${recipeCreatorId}`);
  };
  const editRecipe = (e) => {
    e.preventDefault();
    if (
      localStorage.getItem("userId") === "1" ||
      Number(localStorage.getItem("userId")) === recipeCreatorId
    ) {
      navigate(`/recipeEdit/${rid}`);
    }
  };

  const deleteRecipe = (e) => {
    e.preventDefault();
    ApiCall("DELETE", `/deleteRecipe/${rid}`).then((data) => {
      navigate(`/`);
    });
  };

  const likeRecipe = (e) => {
    e.preventDefault();
    if (localStorage.getItem("userId") === null) {
      navigate("/login");
    } else {
      // API call for liking recipe
      let likeState = 1;
      if (isLiked) {
        likeState = 0;
      }
      const body = {
        likeStatus: likeState,
        rid: Number(rid),
        uid: Number(localStorage.getItem("userId")),
      };
      ApiCall("POST", "/like/setLike", body).then((data) => {
        if (!isLiked) {
          setNumLikes(numLikes + 1);
        } else {
          setNumLikes(numLikes - 1);
        }
      });
      setIsLiked(!isLiked);
    }
  };

  useEffect(() => {
    function getRecipeInfo() {
      if (localStorage.getItem("userId") !== null) {
        ApiCall(
          "GET",
          `recipe/getRecipe/${params.id}/${localStorage.getItem("userId")}`
        ).then((data) => {
          setName(data.name);
          setImg(data.imgurl);
          setRecipeCreatorId(data.uid);
          setRecipeCreatorName(data.author);
          setNumLikes(data.likenum);
          setRid(data.rid);
          setMethods(data.method.slice(0, -1).split("#"));
          setIngredients(data.ingredient.slice(0, -1).split("#"));
          setComments(data.comment);
          setSimilarRecipes(data.similar);
          setMealType(data.mealtype);
          const time =
            data.createtime.substring(0, 10) +
            " " +
            data.createtime.substring(11, 19);
          setCreateTime(time);
          if (
            data.uid === Number(localStorage.getItem("userId")) ||
            localStorage.getItem("userId") === "1"
          ) {
            setShowEdit(true);
          }
          if (data.likestatus !== 0) {
            setIsLiked(true);
          }
          if (localStorage.getItem("userId") != null) {
            if (data.notebook === null) {
              ApiCall(
                "POST",
                `user/createNotebook/${localStorage.getItem("userId")}/${
                  data.rid
                }`,
                { content: "" }
              );
              setNotebookContents("");
            } else {
              setNotebookContents(data.notebook);
            }
          }
        });
      } else {
        ApiCall("GET", `recipe/getRecipe/${params.id}/0`).then((data) => {
          setName(data.name);
          setImg(data.imgurl);
          setRecipeCreatorId(data.uid);
          setRecipeCreatorName(data.author);
          setNumLikes(data.likenum);
          setRid(data.rid);
          setMethods(data.method.slice(0, -1).split("#"));
          setIngredients(data.ingredient.slice(0, -1).split("#"));
          setComments(data.comment);
          setSimilarRecipes(data.similar);
          setMealType(data.mealtype);
          const time =
            data.createtime.substring(0, 10) +
            " " +
            data.createtime.substring(11, 19);
          setCreateTime(time);
          setShowEdit(false);
          setIsLiked(false);
        });
      }
    }
    getRecipeInfo();
  }, [params.id]);

  const SimilarRecipe = () => {
    const recipeInfo = similarRecipes.map((recipe) => {
      return (
        <Grid item xs={4} key={recipe.rid}>
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
      <Grid container spacing={2} pl={2}>
        {recipeInfo}
      </Grid>
    );
  };

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
                <Grid item xs={name.length > 40 ? 7 : 5}>
                  <Typography p={10} variant={name.length > 25 ? "h3" : "h1"}>
                    {name}
                  </Typography>
                  <Typography pl={10} variant="h4">
                    Creator:{" "}
                  </Typography>
                  <Box pl={10}>
                    <Button
                      size="large"
                      style={{ fontSize: "25px" }}
                      onClick={() => setModalOpen(true)}
                    >
                      {recipeCreatorName}
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={name.length > 40 ? 5 : 7}>
                  <Box component="img" maxWidth="80%" width="80%" src={img} />
                </Grid>
              </Grid>
              <Grid container columnSpacing={2}>
                <Grid item>
                  <IconButton
                    size="large"
                    onClick={likeRecipe}
                    color="primary"
                    aria-label="like recipe"
                    component="label"
                  >
                    {isLiked ? (
                      <FavoriteIcon fontSize="inherit" />
                    ) : (
                      <FavoriteBorderIcon fontSize="inherit" />
                    )}
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography fontSize="35px">{numLikes}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-evenly" spacing={5}>
              <Button
                color="error"
                sx={{ width: "20%", maxHeight: "100", maxWidth: "360" }}
                style={showEdit ? { display: "block" } : { display: "none" }}
                variant="contained"
                onClick={editRecipe}
              >
                Edit Recipe
              </Button>
              <Button
                color="error"
                sx={{ width: "20%", maxHeight: "100", maxWidth: "360" }}
                style={showEdit ? { display: "block" } : { display: "none" }}
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    localStorage.getItem("userId") === "1" ||
                    Number(localStorage.getItem("userId")) === recipeCreatorId
                  ) {
                    setDeleteModalOpen(true);
                  }
                }}
              >
                Delete Recipe
              </Button>
              <Button
                color="primary"
                sx={{ width: "20%", maxHeight: "100", maxWidth: "360" }}
                variant="contained"
                onClick={() => {
                  if (localStorage.getItem("userId") !== null) {
                    setShowNotebook(!showNotebook);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                {showNotebook ? "Hide Notebook" : "Show Notebook"}
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Typography p={4} pt={3} pb={1} variant="h3">
                Create time
              </Typography>
              <List sx={{ width: "100%", maxWidth: "360" }}>
                <ListItem>
                  <ListItemIcon>
                    <ChevronRightIcon pb={1} />
                  </ListItemIcon>
                  <ListItemText primary={createTime} />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Typography p={4} pt={3} pb={1} variant="h3">
                Meal Type
              </Typography>
              <List sx={{ width: "100%", maxWidth: "360" }}>
                <ListItem>
                  <ListItemIcon>
                    <ChevronRightIcon pb={1} />
                  </ListItemIcon>
                  <ListItemText primary={mealType} />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Typography p={4} pt={3} pb={1} variant="h3">
                Ingredients
              </Typography>
              <List sx={{ width: "100%", maxWidth: "360" }}>
                {ingredients.map((m, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ChevronRightIcon pb={1} />
                    </ListItemIcon>
                    <ListItemText primary={m} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Typography p={4} pt={3} pb={1} variant="h3">
                Methods
              </Typography>
              <List sx={{ width: "100%", maxWidth: "360" }}>
                {methods.map((ing, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ChevronRightIcon pb={1} />
                    </ListItemIcon>
                    <ListItemText primary={ing} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Typography p={4} pt={3} pb={1} variant="h4">
                Comments
              </Typography>
              <List sx={{ width: "100%", maxWidth: "360" }}>
                {comments.map((c, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <PersonIcon pb={1} />
                    </ListItemIcon>
                    <ListItemText primary={c.username} secondary={c.content} />
                  </ListItem>
                ))}
              </List>
              <Grid p={3} pt={2} spacing={1} container>
                <TextField
                  sx={{ width: "80%", maxWidth: "360" }}
                  label="Add Comment"
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                ></TextField>
                <Button
                  sx={{ width: "20%", maxHeight: "100", maxWidth: "360" }}
                  size="large"
                  variant="contained"
                  onClick={postComment}
                >
                  Post
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 5 }}>
              <Typography p={4} pt={3} pb={1} variant="h3">
                Similar recipes
              </Typography>
              <List sx={{ width: "100%", maxWidth: "360" }}>
                <SimilarRecipe />
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Typography>Go to {recipeCreatorName}'s profile?</Typography>
            <Button variant="contained" onClick={goToCreator} color="primary">
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={() => setModalOpen(false)}
              color="error"
            >
              No, take me back
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Typography>
              Are you sure you want to delete this recipe?
            </Typography>
            <Button variant="contained" onClick={deleteRecipe} color="error">
              Yes, delete it
            </Button>
            <Button
              variant="contained"
              onClick={() => setDeleteModalOpen(false)}
              color="primary"
            >
              No, take me back
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Notebook
        show={showNotebook}
        rid={rid}
        uid={localStorage.getItem("userId")}
        notebookContents={notebookContents}
      />
    </>
  );
}

export default RecipeDetail;
