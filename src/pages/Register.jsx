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

export const Register = () => {
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    if (!checkEmail(email)) return toast.error("Your email is incorrect");
    if (password.length < 5) return toast("Please enter a stronger password");

    if (name.length < 2) return toast.error("Please enter a longer name");

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.updateProfile({ displayName: name })
          .then(() => {
            firebase
              .firestore()
              .doc(`users/${firebase.auth().currentUser.uid}`)
              .set({
                id: firebase.auth().currentUser.uid,
                bio: "",
                displayName: name,
                favourites: [],
                photoUrl: "",
                private: false,
              })
              .then(() => {
                toast.success("Account Created! Welcome");
                history.push("/connect");
              });
          });
      })
      .catch(error => {
        console.log(error);
        toast.error("An account with that email already exists.");
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
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" width="100%" fullWidth>
            <TextField
              label="Name"
              type="text"
              inputRef={nameRef}
              style={{ marginTop: "2rem" }}
            />

            <TextField
              label="E-mail"
              type="email"
              inputRef={emailRef}
              style={{ marginTop: "1.3rem" }}
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
            Have an account?{" "}
            <Link
              style={{ cursor: "pointer" }}
              component={RouterLink}
              to="/login"
            >
              Log in
            </Link>
          </Typography>
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            color="primary"
            style={{ marginTop: "1.5rem" }}
          >
            Register
          </Button>
        </form>
      </Box>
    </DefaultLayout>
  );
};
