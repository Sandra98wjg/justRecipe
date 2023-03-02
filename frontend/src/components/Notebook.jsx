// Notebook
import { useState, useEffect } from "react";
import { ApiCall } from "../components/ApiCall";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@mui/material/IconButton";

function Notebook({ show, rid, notebookContents }) {
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const deleteNotebook = () => {
    if (localStorage.getItem("userId") === null) {
      navigate("/login");
    } else {
      ApiCall(
        "DELETE",
        `user/deleteNotebook/${localStorage.getItem("userId")}/${rid}`
      ).then(() => window.location.reload());
    }
  };
  const saveNotebook = () => {
    if (localStorage.getItem("userId") === null) {
      navigate("/login");
    } else {
      ApiCall(
        "PUT",
        `user/updateNotebook/${localStorage.getItem("userId")}/${rid}`,
        { content: notes }
      );
    }
  };

  useEffect(() => {
    const initNotes = () => {
      setNotes(notebookContents);
    };
    initNotes();
  }, [notebookContents]);

  return (
    <>
      <Box
        sx={
          show
            ? {
                width: 300,
                height: 300,
                backgroundColor: "rgba(76, 175, 80, 0.5)",
                "&:hover": {
                  backgroundColor: "rgba(76, 175, 80, 0.3)",
                },
                display: "block",
                position: "sticky",
                left: "75%",
                bottom: "50px",
                borderRadius: "8px",
                padding: "10px",
              }
            : { display: "none" }
        }
      >
        <Typography variant="h6">Personal Notes: </Typography>
        <TextField
          multiline
          variant="standard"
          defaultValue={notes}
          maxRows={10}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Stack direction="row" justifyContent="flex-end">
          <IconButton sx={{ color: "#222222" }} onClick={deleteNotebook}>
            <DeleteIcon />
          </IconButton>
          <IconButton sx={{ color: "#222222" }} onClick={saveNotebook}>
            <SaveIcon />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
}

export default Notebook;
