import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import { ApiCall } from "../components/ApiCall";
import PrimarySearchAppBar from "../components/NavigationBar";
import React from "react";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";

function Register() {
  const navigate = useNavigate();
  const [showErrBlock, setShowErrBlock] = React.useState(false);
  const handleBadRegister = (errStatus) => {
    if (errStatus === "400") {
      setShowErrBlock(true);
    }
  };
  return (
    <>
      <PrimarySearchAppBar />
      <RegisterForm
        submit={async (username, email, password) => {
          const body = {
            email: email,
            username: username,
            password: password,
          };
          ApiCall("PUT", "user/userRegister", body, handleBadRegister).then(
            (data) => {
              if (data) {
                localStorage.setItem("userId", data.uid);
                navigate("/");
              }
            }
          );
        }}
      />
      <Container component="main" maxWidth="xs">
        <Collapse in={showErrBlock}>
          <Alert severity="error">This username is already taken!</Alert>
        </Collapse>
      </Container>
    </>
  );
}

export default Register;
