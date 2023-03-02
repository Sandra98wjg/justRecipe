import ProfileModificationForm from "../components/ProfileModificationForm";
import { ApiCall } from "../components/ApiCall";
import { useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../components/NavigationBar";
import React from "react";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";

function ProfileModificaton() {
  const navigate = useNavigate();
  const [showErrBlockBadLogin, setShowErrBlockBadLogin] = React.useState(false);
  const handleBadRegister = (errStatus) => {
    if (errStatus === "400") {
      setShowErrBlockBadLogin(true);
    }
  };

  return (
    <>
      <PrimarySearchAppBar />
      <ProfileModificationForm
        submit={async (username, email, password) => {
          const body = {
            username: username ? username : null,
            email: email ? email : null,
            password: password ? password : null,
            id: localStorage.getItem("userId"),
          };
          ApiCall(
            "PUT",
            `user/userUpdate/${localStorage.getItem("userId")}`,
            body,
            handleBadRegister
          ).then((data) => {
            if (data) {
              navigate("/");
            }
          });
        }}
      />
      <Container component="main" maxWidth="xs">
        <Collapse in={showErrBlockBadLogin}>
          <Alert severity="error">This username is already taken!</Alert>
        </Collapse>
      </Container>
    </>
  );
}

export default ProfileModificaton;
