import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

function ProfileModificationForm({ submit }) {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    submit(username, email, password); // to be completed - send data to backend
  };

  const validateForm = () => {
    return (
      (password.length === 0 || isStrong(password)) &&
      password === confirmPassword
    );
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  const isStrong = (p) => {
    const strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    return strongPassword.test(p);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          padding="40px"
          borderRadius="10px"
        >
          <Typography
            style={{ textAlign: "center" }}
            component="h1"
            variant="h5"
          >
            Please update your user information here
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="inputRounded"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className="inputRounded"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className="inputRounded"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid
              item
              sx={
                isStrong(password) || password.length === 0
                  ? { display: "none" }
                  : { display: "flex" }
              }
              xs={12}
            >
              <Alert severity="error" style={{ borderRadius: 50 }}>
                Password must include one Uppercase letter, one Lowercase
                letter, one numeral, and one special character.
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputRounded"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid
              item
              sx={
                password === confirmPassword
                  ? { display: "none" }
                  : { display: "flex" }
              }
              xs={12}
            >
              <Alert severity="error" style={{ borderRadius: 50 }}>
                Passwords do not match.
              </Alert>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validateForm()}
            size="large"
            style={{ borderRadius: 50 }}
            onClick={onSubmit}
          >
            Confirm
          </Button>
          <Button
            type="log out"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            // disabled={!validateForm()}
            size="large"
            style={{ borderRadius: 50 }}
            onClick={logOut}
          >
            Log out
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default ProfileModificationForm;
