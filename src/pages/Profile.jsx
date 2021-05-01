import { Box, IconButton, styled, Typography } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import { LoadingView } from "../components/LoadingView";
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

const Profile = () => {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");

  const nameRef = useRef();
  const bioRef = useRef();

  useEffect(
    () =>
      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then(doc => setUser(doc.data()))
        .then(() => setLoading(false)),

    [currentUser]
  );

  const handleChange = type => {
    switch (type) {
      case "name":
        const name = nameRef.current.value;
        const currentUserRef = firebase.auth().currentUser;
        if (!name || name === currentUserRef.displayName) return;

        currentUserRef.updateProfile({ displayName: name });
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

  if (loading) return <LoadingView />;

  return (
    <DefaultLayout overflow="hidden">
      <Box
        overflow="hidden"
        display="grid"
        height="100%"
        width="100%"
        gridGap="1.5rem"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(12, 1fr)"
        padding="2rem"
      >
        <Typography
          variant="h1"
          color="secondary"
          style={{ fontSize: 32, fontWeight: "bolder", gridColumn: "1/-1" }}
        >
          Your Profile
        </Typography>
        <Box
          gridColumn="1/4"
          gridRow="2/4"
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
              gridColumn: "1/-1",
              outline: "none",
            }}
          />
        </Box>
        <Box
          gridColumn="1/4"
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

        {/* bio */}
      </Box>
    </DefaultLayout>
  );
};
export default Profile;
