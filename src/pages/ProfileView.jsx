import {
  Avatar,
  Box,
  Grow,
  styled,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { SimpleLoadingView } from "../components/LoadingView";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import DefaultLayout from "../layouts/DefaultLayout";

const CustomInput = styled("p")({
  outline: "none",
  color: "black",
});

const CustomTextArea = styled("p")({
  outline: "none",
  color: "black",
});

const ProfileView = props => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");
  const small = useMediaQuery("(max-width: 1200px)");

  const { currentUser } = useAuth();

  useEffect(() => {
    const userid = props.match.params.userid;
    console.log(userid);

    firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .get()
      .then(doc => setUser(doc.data()))
      .then(() => setLoading(false));
  }, [props.match.params.userid]);

  return (
    <DefaultLayout overflow="hidden">
      {loading ? (
        <SimpleLoadingView />
      ) : user.private && user.id !== currentUser.uid ? (
        <Box justifyContent="center" alignItems="center">
          <Typography
            variant="h1"
            style={{ fontSize: "24px", fontWeight: "bolder" }}
          >
            Private Profile; You don't have persmission to view this profile
          </Typography>
        </Box>
      ) : (
        <Grow in={!loading}>
          <>
            <Box
              marginLeft={!small && "50%"}
              overflow="hidden"
              style={{
                overflowY: "hidden",
                transform: !small && "translateX(-25%)",
              }}
              width="100%"
              padding="2rem"
            >
              <Typography
                variant="h1"
                color="secondary"
                style={{
                  fontSize: 32,
                  fontWeight: "bolder",
                  marginBottom: "2rem",
                }}
              >
                {user.displayName.split(" ")[0]}'s Profile
              </Typography>
              <Box
                width="100%"
                borderRadius="1rem"
                boxShadow="1px 2px 2px 0px gray, 0 0 3px -1px gray"
                maxWidth={small ? "70%" : "40%"}
                padding="2rem"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  position="relative"
                >
                  <Typography
                    variant="h3"
                    style={{
                      fontSize: 24,
                      fontWeight: "bolder",
                    }}
                  >
                    Name
                  </Typography>
                  <Avatar
                    src={user.photoURL}
                    style={{
                      width: "4rem",
                      height: "4rem",
                      position: "absolute",
                      right: "1rem",
                      top: "1rem",
                    }}
                  />
                </Box>
                <CustomInput
                  style={{
                    fontSize: 22,
                    width: "100%",
                    outline: "none",
                  }}
                >
                  {user.displayName ? user.displayName : "Anonymous"}
                </CustomInput>
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
                    }}
                  >
                    Bio
                  </Typography>
                </Box>
                <CustomTextArea
                  style={{
                    fontSize: 18,
                    width: "100%",
                    height: "85%",
                    outline: "none",
                  }}
                >
                  {user && user.bio ? user.bio : "No bio yet."}
                </CustomTextArea>
              </Box>
            </Box>
          </>
        </Grow>
      )}
    </DefaultLayout>
  );
};
export default ProfileView;
