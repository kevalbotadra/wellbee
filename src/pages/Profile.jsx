import { Box, IconButton, styled, Typography } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import DefaultLayout from "../layouts/DefaultLayout";

const CustomInput = styled("input")({
  outline: "none",
  border: "2px solid transparent",
  padding: "0",
  transition: "border 200ms",

  "&:focus": {
    borderBottom: "2px solid #493843",
  },
});

const Profile = () => {
  const { currentUser } = useAuth();

  const nameRef = useRef();

  const handleChange = type => {
    switch (type) {
      case "name":
        const name = nameRef.current.value;
        const currentUserRef = firebase.auth().currentUser;
        if (!name || name === currentUserRef.displayName) return;

        currentUserRef.updateProfile({ displayName: name });
        return;
      default:
        return;
    }
  };

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
          boxShadow="0 0 5px -1px gray"
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

        {/* bio */}
      </Box>
    </DefaultLayout>
  );
};
export default Profile;
