// RandomRecipeModal
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function RandomRecipeModal({ randModalOpen }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(randModalOpen);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setModalOpen(true);
        }}
        color="primary"
      >
        Random Recipe
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography>
              What type of recipe would you like to generate?
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                navigate("randomRecipe/soup");
              }}
              color="primary"
            >
              Soup
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("randomRecipe/salad");
              }}
              color="primary"
            >
              Salad
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("randomRecipe/sandwich");
              }}
              color="primary"
            >
              Sandwich
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default RandomRecipeModal;
