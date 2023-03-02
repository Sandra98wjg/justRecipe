import React, { useState } from "react";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from "react-router-dom";
import { ApiCall } from "./ApiCall";
import { useEffect } from "react";


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProfileHead(props) {
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    let [follows, setFollows] = useState(props.follow);

  // for admin to delete user
  function deleteUser(e) {
    e.preventDefault();
    ApiCall("DELETE", `/admin/deleteUser/${props.id}`).then((data) => {
      navigate("/");
    });
  }
  useEffect(() => {
    setFollows(props.follow);
  }, [props.follow]);

  // change follow status
  const followChange = (e) => {
    e.preventDefault();
    if (follows) {
      let body = {
        contributorId: props.id,
        followerId: localStorage.getItem("userId"),
        status: 0,
      };
      ApiCall("POST", `user/subscribe`, body)
        .then((data) => {})
        .catch(alert);
      // status:0
    } else {
      let body = {
        contributorId: props.id,
        followerId: localStorage.getItem("userId"),
        status: 1,
      };
      ApiCall("POST", `user/subscribe`, body)
        .then((data) => {})
        .catch(alert);
      // status:1
    }
    setFollows(!follows);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid style={{ margin: "10px" }}>
          <Avatar sx={{ width: 60, height: 60 }}>U</Avatar>
        </Grid>
        <Grid style={{ margin: "10px" }}>
          <h1>{props.name}</h1>
          <div>{props.email}</div>
        </Grid>
        <Grid style={{ margin: "20px" }}>
          <div
            style={props.showEdit ? { display: "block" } : { display: "none" }}
          >
            <Link to="/profile/modification">
              <Button color="primary">
                <BorderColorIcon />
                Modify / Log out
              </Button>
            </Link>
          </div>
          <div
            style={!props.showEdit ? { display: "block" } : { display: "none" }}
          >
            <div
              className="unfollow-btn"
              style={follows ? { display: "block" } : { display: "none" }}
            >
              <Button
                variant="outlined"
                href="#outlined-buttons"
                size="small"
                sx={{ display: "inline" }}
                onClick={followChange}
              >
                Followed
              </Button>
            </div>
            <div
              className="unfollow-btn"
              style={follows ? { display: "none" } : { display: "block" }}
            >
              <Button
                variant="outlined"
                href="#outlined-buttons"
                size="small"
                color="info"
                sx={{ display: "inline" }}
                onClick={followChange}
              >
                Follow
              </Button>
            </div>

          </div>
        </Grid>
        <Grid style={{ margin: '10px' }}>
          <div style={localStorage.getItem('userId')==='1' ? {display: 'block'} : {display: 'none'}}>
            <Button color="error" variant="contained" onClick={() => {setDeleteModalOpen(true)}}>
                Delete this user
            </Button>
          </div>
        </Grid>
        <Modal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
        >
          <Box sx={modalStyle}>
            <Stack spacing={2}>
              <Typography>Are you sure you want to delete this User account (and all associated recipes)?</Typography>
              <Button variant="contained" onClick={deleteUser} color="error">Yes, delete it</Button>
              <Button variant="contained" onClick={() => setDeleteModalOpen(false)} color="primary">No, take me back</Button>
            </Stack>
          </Box>

        </Modal>
      </Grid>
      <hr />
      <div className="user-profile-btn">
        <Button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/profile/${props.id}`;
          }}
        >
          <Link className="profile-recipe-word">{props.name}'s recipes</Link>
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/profile/follower/${props.id}`;
          }}
        >
          <Link className="profile-recipe-word">{props.name}'s follows</Link>
        </Button>
      </div>
    </>
  );
}
export default ProfileHead;
