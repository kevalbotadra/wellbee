import { Avatar, Box, Button, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { emojify } from "react-emoji";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { SimpleLoadingView } from "./LoadingView";

export const ChatMessageDisplay = ({
  messages,
  uid,
  chat,
  increaseMessageLimit,
}) => {
  const dumdumRef = useRef();
  const topRef = useRef();
  const [otherUser, setOtherUser] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const { currentUser } = useAuth();

  useEffect(
    () =>
      firebase
        .firestore()
        .doc(
          `users/${
            chat.participants[0] === currentUser.uid
              ? chat.participants[1]
              : chat.participants[0]
          }`
        )
        .get()
        .then(user => setOtherUser(user.data()))
        .finally(() => setLoaded(true)),
    [chat, currentUser.uid]
  );

  useEffect(() => dumdumRef.current.scrollIntoView({ behavior: "smooth" }));

  return (
    <Box overflow="auto" gridRow="1/2" width="100%" height="100%">
      {!loaded ? (
        <SimpleLoadingView />
      ) : (
        <>
          <Button
            variant="contained"
            color="secondary"
            ref={topRef}
            style={{
              marginLeft: "50%",
              transform: "translateX(-50%)",
              marginTop: "1rem",
            }}
            onClick={() => {
              increaseMessageLimit();
              setTimeout(
                () => topRef.current.scrollIntoView({ behavior: "smooth" }),
                500
              );
            }}
          >
            Load More Messages
          </Button>
          {messages.map(message => {
            if (message.from === uid)
              return (
                <Box
                  display="flex"
                  flexDirection="row-reverse"
                  alignSelf="right"
                  alignItems="center"
                  margin="1rem"
                  marginRight="2rem"
                >
                  <Avatar src={currentUser.photoURL} />
                  <Box
                    borderRadius="10rem"
                    bgcolor="#F4F6F6"
                    padding="0.6rem 1.3rem"
                    marginRight="1rem"
                  >
                    <Typography style={{ textAlign: "right" }}>
                      {emojify(message.content, {
                        emojiType: "emojione",
                        attributes: {
                          height: "18px",
                          width: "18px",
                          style: { marginBottom: "-4px" },
                        },
                      })}
                    </Typography>
                  </Box>
                </Box>
              );
            else
              return (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignSelf="right"
                  alignItems="center"
                  margin="1rem"
                  marginLeft="2rem"
                >
                  <Avatar src={otherUser && otherUser.photoURL} />
                  <Box
                    borderRadius="10rem"
                    bgcolor="#FFF"
                    border="2px solid #e9eded"
                    padding="0.6rem 1.3rem"
                    marginLeft="1rem"
                  >
                    <Typography style={{ textAlign: "left" }}>
                      {emojify(message.content, {
                        emojiType: "emojione",
                        attributes: {
                          height: "18px",
                          width: "18px",
                          style: { marginBottom: "-4px" },
                        },
                      })}
                    </Typography>
                  </Box>
                </Box>
              );
          })}
        </>
      )}
      <Box id="dumdum" ref={dumdumRef} />
    </Box>
  );
};
