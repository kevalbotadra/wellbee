import { Box, Button, Link, TextField, Typography } from "@material-ui/core";
import { useRef } from "react";
import toast from "react-hot-toast";
import { Link as RouterLink, useHistory } from "react-router-dom";
import firebase from "../firebase";
import DefaultLayout from "../layouts/DefaultLayout";
const checkEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const Login = () => {
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!checkEmail(email)) return toast.error("Bad email");

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        toast.success("Logged in!");

        setTimeout(() => history.push("/connect"), 600);
      })
      .catch(error => {
        console.log(error);
        toast.error("Bad Credentials");
      });
  };

  return (
    <DefaultLayout>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingTop="4rem"
      >
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" width="100%" fullWidth>
            <TextField
              label="E-mail"
              type="email"
              inputRef={emailRef}
              style={{ marginTop: "2rem" }}
            />

            <TextField
              label="Passowrd"
              type="password"
              inputRef={passwordRef}
              fullWidth
              style={{ marginTop: "1.3rem", minWidth: "20rem" }}
            />
          </Box>
          <Typography style={{ marginTop: "1rem" }}>
            Don't have an account?{" "}
            <Link
              style={{ cursor: "pointer" }}
              component={RouterLink}
              to="/register"
            >
              Register
            </Link>
          </Typography>
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            color="primary"
            style={{ marginTop: "1.5rem" }}
          >
            Log in
          </Button>
        </form>
      </Box>
    </DefaultLayout>
  );
};
