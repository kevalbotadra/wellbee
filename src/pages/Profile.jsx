import {
  Avatar,
  Box,
  Button,
  Grow,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { SimpleLoadingView } from "../components/LoadingView";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import DefaultLayout from "../layouts/DefaultLayout";

const CustomInput = styled("input")({
  outline: "none",
  border: "2px solid transparent",
  padding: "0",
  transition: "border 200ms, background-color 200ms",

  "&:focus": {
    borderBottom: "2px solid #493843",
    backgroundColor: "#F4F6F6",
  },
});

const CustomTextArea = styled("textarea")({
  outline: "none",
  border: "2px solid transparent",
  paddingLeft: "0",
  transition: "border 200ms, background-color 200ms",

  "&:focus": {
    borderBottom: "2px solid #493843",
    backgroundColor: "#F4F6F6",
  },
});

const uploadImage = e => {
  if (!e.target || !e.target.files || e.target.files.length === 0) return;

  const [image] = e.target.files;
  if (!image) return;

  // const file = new File(image, uuid());

  firebase
    .storage()
    .ref()
    .child(`profile_pics/${uuid()}`)
    .put(image)
    .then(async snap => {
      const url = await snap.ref.getDownloadURL();
      const current = firebase.auth().currentUser;

      current
        .updateProfile({ photoURL: url })
        .then(() => toast.success("set profile pic"));
      firebase
        .firestore()
        .doc(`users/${current.uid}`)
        .set({ photoURL: url }, { merge: true });
      toast.success("Uploaded File");
    });
};

const Profile = () => {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const small = useMediaQuery("(max-width: 1200px)");

  const [user, setUser] = useState("");

  const nameRef = useRef();
  const bioRef = useRef();

  useEffect(
    () =>
      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot(snapshot => {
          const doc = snapshot.data();
          console.log("often");
          setUser(doc);

          if (loading) setLoading(false);
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleChange = type => {
    switch (type) {
      case "name":
        const name = nameRef.current.value;
        const currentUserRef = firebase.auth().currentUser;
        if (!name || name === currentUserRef.displayName) return;

        currentUserRef.updateProfile({ displayName: name });
        firebase
          .firestore()
          .doc(`users/${currentUserRef.uid}`)
          .set({ displayName: name }, { merge: true });
        return;
      case "bio":
        const bio = bioRef.current.value;
        if (!bio || bio === user.bio) return;

        firebase
          .firestore()
          .doc(`users/${currentUser.uid}`)
          .set({ bio }, { merge: true });
        return;
      default:
        return;
    }
  };

  const switchPrivate = () => {
    firebase
      .firestore()
      .doc(`users/${currentUser.uid}`)
      .update({ private: !user.private })
      .then(() => toast.success("Updated profile"));
  };

  return (
    <DefaultLayout overflow="hidden">
      {loading ? (
        <SimpleLoadingView />
      ) : (
        <Grow in={!loading}>
          <>
            <Box
              overflow="hidden"
              style={{ overflowY: "hidden", transform: "translateX(-50%)" }}
              display="grid"
              justifyContent="center"
              width={small ? "100%" : "50%"}
              marginLeft="50%"
              gridGap="1.5rem"
              gridTemplateColumns="repeat(6, 1fr)"
              gridTemplateRows="repeat(6, 1fr)"
              padding="2rem"
            >
              <Box
                style={{ gridColumn: "1/7", gridRow: "1/2" }}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h1"
                  color="secondary"
                  style={{
                    fontSize: 32,
                    fontWeight: "bolder",
                  }}
                >
                  Your Profile
                </Typography>
                <Button
                  color="secondary"
                  variant={user.private ? "outlined" : "contained"}
                  onClick={() => switchPrivate()}
                >
                  {user.private ? "Make Public" : "Make Private"}
                </Button>
              </Box>
              <Box
                gridColumn="1/5"
                gridRow="2/4"
                marginTop="-1rem"
                borderRadius="1rem"
                boxShadow="1px 2px 2px 0px gray, 0 0 3px -1px gray"
                padding="2rem"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h3"
                    style={{
                      fontSize: 24,
                      fontWeight: "bolder",
                      marginBottom: "1rem",
                    }}
                  >
                    Name
                  </Typography>
                  <IconButton
                    style={{ fontSize: 24 }}
                    color="secondary"
                    onClick={() => nameRef.current.focus()}
                  >
                    <EditTwoTone color="secondary" />
                  </IconButton>
                </Box>
                <CustomInput
                  defaultValue={currentUser.displayName}
                  ref={nameRef}
                  onChange={() => handleChange("name")}
                  style={{
                    fontSize: 22,
                    width: "100%",
                    outline: "none",
                  }}
                />
              </Box>
              <Box
                gridColumn="1/7"
                gridRow="4/8"
                borderRadius="1rem"
                boxShadow="1px 2px 2px 0px gray, 0 0 3px -1px gray"
                padding="2rem"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h3"
                    style={{
                      fontSize: 24,
                      fontWeight: "bolder",
                      gridColumn: "1/-1",
                      marginBottom: "1rem",
                    }}
                  >
                    Bio
                  </Typography>
                  <IconButton
                    style={{ fontSize: 24 }}
                    color="secondary"
                    onClick={() => bioRef.current.focus()}
                  >
                    <EditTwoTone color="secondary" />
                  </IconButton>
                </Box>
                <CustomTextArea
                  defaultValue={user && user.bio ? user.bio : ""}
                  placeholder="Write something about yourself!"
                  ref={bioRef}
                  onChange={() => handleChange("bio")}
                  rows="3"
                  style={{
                    fontSize: 16,
                    width: "100%",
                    height: "85%",
                    gridColumn: "1/-1",
                    outline: "none",
                  }}
                />
              </Box>
              <Box
                gridColumn="5/7"
                gridRow="2/3"
                borderRadius="1rem"
                display="flex"
                marginTop="-1rem"
                alignItems="center"
                padding="1px"
                boxShadow="1px 2px 2px 0px gray, 0 0 3px -1px gray"
              >
                <Avatar style={{ margin: "2rem" }} src={currentUser.photoURL} />
                {/* <img
                  style={{ margin: "2rem" }}
                  src={currentUser.photoUrl}
                  alt="profile"
                /> */}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={uploadImage}
                  component="label"
                  style={{ borderRadius: "1rem", height: "2rem" }}
                >
                  Upload
                  <input
                    type="file"
                    onChange={uploadImage}
                    hidden
                    accept="image/*"
                    multiple={false}
                  />
                </Button>
              </Box>
            </Box>
          </>
        </Grow>
      )}
    </DefaultLayout>
  );
};
export default Profile;
