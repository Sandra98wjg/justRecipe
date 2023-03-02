import React from "react";
import PrimarySearchAppBar from "../components/NavigationBar";
import ProfileHead from "../components/ProfileHead";
import FollowerCard from "../components/FollowerCard";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import { ApiCall } from "../components/ApiCall";
import RecipePagination from "../components/RecipePagination";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

function ProfileFollower() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [followers, setFollowers] = useState([]);
  let [followerNum, setFollowerNum] = useState(0);
  let [page, setPage] = useState(1);
  const followersPerPage = 20;
  const params = useParams();
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");
  const [followStatus, setFollowStatus] = useState(false);

  // get all user info
  useEffect(() => {
    function getUserInfo() {
      ApiCall(
        "GET",
        `user/getProfile/${params.uid}/${localStorage.getItem("userId")}`
      ).then((data) => {
        setName(data.name);
        setEmail(data.email);
        setFollowers(data.follows);
        setFollowerNum(data.follows.length);
        setId(params.uid);
        if (data.status === 1) {
          setFollowStatus(true);
        } else {
          setFollowStatus(false);
        }
        params.uid === localStorage.getItem("userId")
          ? setShowEdit(true)
          : setShowEdit(false);
      });
    }
    getUserInfo();
  }, [params.uid]);

  // display followers
  const FollowerTotal = () => {
    const followersInfo = followers
      .slice((page - 1) * followersPerPage, page * followersPerPage)
      .map((follower) => {
        return (
          <Grid key={follower.id}>
            <FollowerCard
              key={follower.id}
              name={follower.name}
              email={follower.email}
              id={follower.id}
              showEdit={showEdit}
            />
          </Grid>
        );
      });
    return (
      <div className="user-follower-list">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {followersInfo}
        </List>
      </div>
    );
  };

  return (
    <>
      <PrimarySearchAppBar />
      <ProfileHead
        id={id}
        name={name}
        email={email}
        showEdit={showEdit}
        follow={followStatus}
      />
      <FollowerTotal />
      <RecipePagination
        setPage={setPage}
        page={page}
        totalPage={Math.ceil(followerNum / followersPerPage)}
      />
    </>
  );
}

export default ProfileFollower;
