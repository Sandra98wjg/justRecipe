import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { ApiCall } from "./ApiCall";

// this components is used to create follower card
export default function FollowerCard(props) {
  let [follows, setFollows] = useState(true);

  // if change follow status
  const followChange = (e) => {
    e.preventDefault();
    if (follows) {
      // unfollow
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
      // follow
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
        justifyContent="flex-start"
        alignItems="center"
        style={{ margin: "15px" }}
      >
        <Grid item xs={2}>
          <Avatar sx={{ width: 60, height: 60 }}>U</Avatar>
        </Grid>
        <Grid item xs={5}>
          <Button
            color="inherit"
            style={{ paddingBottom: "10px", textDecoration: "underline" }}
            onClick={() => (window.location.href = `/profile/${props.id}`)}
          >
            {props.name}
          </Button>
          <div style={{ paddingLeft: "5px" }}>{props.email}</div>
        </Grid>
        <Grid item xs={4}>
          <div
            style={props.showEdit ? { display: "block" } : { display: "none" }}
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
      </Grid>
      <hr />
    </>
  );
}
