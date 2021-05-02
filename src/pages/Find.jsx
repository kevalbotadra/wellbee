import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grow,
  Typography,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { SimpleLoadingView } from "../components/LoadingView";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import DefaultLayout from "../layouts/DefaultLayout";

const Find = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [processOngoing, setProcessOngoing] = useState(false);

  useEffect(
    () =>
      firebase
        .firestore()
        .doc(`users/${currentUser.uid}`)
        .onSnapshot(snapshot => {
          const doc = snapshot.data();
          setUser(doc);
          setLoaded(true);
        }),
    [currentUser]
  );

  const findMatch = () => {
    setProcessOngoing(true);
    setTimeout(() => {
      setProcessOngoing(false);
      toast.success(
        "You can continue chatting now, you should see a new chat in the next couple minutes!",
        { duration: 5000 }
      );
    }, 3000);

    // const fun = firebase.functions().httpsCallable("find");
    // fun().then(res => console.log(res));
  };

  return (
    <DefaultLayout>
      {!loaded ? (
        <SimpleLoadingView />
      ) : (
        <Grow in={loaded}>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography
              variant="h1"
              style={{
                fontSize: 32,
                fontWeight: "bolder",
                textAlign: "center",
                marginTop: "2rem",
              }}
            >
              Find Friends
            </Typography>
            <Typography
              variant="h3"
              style={{
                fontSize: 20,
                marginTop: "0.5rem",

                marginBottom: "2rem",
              }}
            >
              Review your profile before you submit
            </Typography>
            <Box
              width="min(100%, 500px)"
              borderRadius="1rem"
              padding="2rem 1.5rem"
              display="flex"
              justifyContent="center"
              textAlign="center"
              alignItems="center"
              flexDirection="column"
              boxShadow="1px 2px 2px 0px gray, 0 0 3px -1px gray"
            >
              <Avatar
                src={user.photoURL}
                style={{ marginBottom: "1rem", width: "69px", height: "69px" }}
              />
              <Typography
                variant="h2"
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Name
              </Typography>
              <Typography style={{ fontSize: 18, fontWeight: "normal" }}>
                {user.displayName}
              </Typography>

              <Typography
                variant="h2"
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                Bio
              </Typography>
              <Typography
                style={{
                  fontSize: 18,
                  fontWeight: "normal",
                  textAlign: "center",
                }}
              >
                {user.bio}
              </Typography>
              <Button
                color="secondary"
                onClick={() => history.push("/profile")}
                startIcon={<Edit />}
                variant="outlined"
                style={{ marginTop: "2rem" }}
              >
                Edit Profile
              </Button>
            </Box>

            {processOngoing ? (
              <Button
                color="primary"
                variant="contained"
                width="5rem"
                style={{
                  marginTop: "3rem",
                  marginBottom: "1rem",
                }}
              >
                <CircularProgress color="secondary" style={{ width: "18px" }} />
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={findMatch}
                style={{ marginTop: "3rem", marginBottom: "1rem" }}
              >
                Start the process
              </Button>
            )}
            <Typography>
              <i>You can only do this once per day</i>
            </Typography>
          </Box>
        </Grow>
      )}
    </DefaultLayout>
  );
};

export default Find;
