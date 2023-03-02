import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function FollowButton(props) {
  let [follow, setFollow] = useState(props.follow);
  // change the follow status
  const followChange = (e) => {
    e.preventDefault();
    setFollow(!follow);
  };
  return (
    <>
      <div
        className="unfollow-btn"
        style={follow ? { display: "block" } : { display: "none" }}
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
        style={follow ? { display: "none" } : { display: "block" }}
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
    </>
  );
}
