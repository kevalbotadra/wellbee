import {
  Box,
  Grow,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { SendRounded, StarOutline, StarOutlined } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { ChatMessageDisplay } from "./ChatMessageDisplay";
import { SimpleLoadingView } from "./LoadingView";

const InputField = styled("input")({
  borderRadius: "10rem",
  backgroundColor: "#F4F6F6",
  border: "none",
  height: "1.5rem",
  width: "86%",
  padding: "1rem 1.5rem",
  outline: "none",
  fontSize: "18px",
  transition: "background-color 200ms",

  "&:focus": {
    backgroundColor: "#e9eded",
  },
});

export const ChatDisplay = ({ activeChat, userPref }) => {
  const small = useMediaQuery("(max-width: 1200px)");
  const inputRef = useRef();

  const { currentUser } = useAuth();

  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState();

  const [messageLimit, setMessageLimit] = useState(50);

  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const send = () => {
    const message = inputRef.current.value;
    if (message === "") return;
    if (message.length > 500) {
      toast.error("Please enter a shorter message");
      return;
    }
    inputRef.current.value = "";

    //  send the actual message

    firebase
      .firestore()
      .collection("messages")
      .add({
        content: message,
        from: currentUser.uid,
        senderName: currentUser.displayName,
        to:
          activeChat.participants[0] === currentUser.uid
            ? activeChat.participants[1]
            : activeChat.participants[0],
        chatid: activeChat.id,
        timestamp: Date.now(),
      });

    firebase.firestore().collection("chats").doc(activeChat.id).update({
      lastMessage: message,
      lastMessageTimestamp: Date.now(),
    });
  };

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("messages")
      .where("chatid", "==", activeChat.id)
      .orderBy("timestamp", "desc")
      .limit(messageLimit)
      .onSnapshot(snapshot => {
        let docs = snapshot.docs;
        docs = docs.map(doc => doc.data());

        docs = docs.sort((a, b) => a.timestamp - b.timestamp);

        setMessages(docs);
      });

    return unsub;
  }, [activeChat, messageLimit]);

  useEffect(
    () =>
      firebase
        .firestore()
        .doc(
          `users/${
            activeChat.participants[0] === currentUser.uid
              ? activeChat.participants[1]
              : activeChat.participants[0]
          }`
        )
        .get()
        .then(user => user.data())
        .then(user => setOtherUser(user))
        .then(() => setLoading(false)),
    [activeChat, currentUser]
  );

  const changeStarred = localStarred =>
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .set(
        {
          favourites: localStarred
            ? firebase.firestore.FieldValue.arrayUnion(activeChat.id)
            : firebase.firestore.FieldValue.arrayRemove(activeChat.id),
        },
        { merge: true }
      );

  if (loading) return <SimpleLoadingView />;
  return (
    <Grow in={true}>
      <Box
        height="calc(70vh + 3rem)"
        borderRadius="1.2rem"
        boxShadow="0 0 4px -1px gray"
        padding="0"
        gridColumn={small ? "4/-1" : "3/-1"}
        paddingBottom="0"
        marginLeft="2rem"
        display="grid"
        gridTemplateColumns="80% 20%"
        gridTemplateRows="10% 90%"
      >
        <Box
          gridRow="1/2"
          gridColumn="1/-1"
          borderBottom="1px solid #aaa"
          display="flex"
          alignItems="center"
          paddingLeft="1.2rem"
        >
          <Typography
            variation="h3"
            onClick={() =>
              history.push(
                `/profile/${
                  activeChat.participants[0] === currentUser.uid
                    ? activeChat.participants[1]
                    : activeChat.participants[0]
                }`
              )
            }
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
          >
            {otherUser && otherUser.private
              ? "Anonymous"
              : otherUser.displayName}{" "}
            •
          </Typography>
          <Typography style={{ color: "gray" }}>
            {" "}
            Friends for 21 days
          </Typography>
          <IconButton
            onClick={() =>
              changeStarred(
                userPref &&
                  userPref.favourites &&
                  !userPref.favourites.includes(activeChat.id)
              )
            }
          >
            {userPref &&
            userPref.favourites &&
            userPref.favourites.includes(activeChat.id) ? (
              <StarOutlined color="primary" />
            ) : (
              <StarOutline />
            )}
          </IconButton>
        </Box>
        {/* <Box
          gridRow="1/3"
          gridColumn="2/3"
          boxShadow="-2px 0 4px -1px #aaa"
        ></Box> */}

        <Box
          gridColumn="1/3"
          paddingBottom="1rem"
          width="100%"
          overflowY="scroll"
          display="grid"
          gridTemplateRows="90% 10%"
        >
          <ChatMessageDisplay
            increaseMessageLimit={() => setMessageLimit(messageLimit + 50)}
            messages={messages}
            uid={currentUser.uid}
            chat={activeChat}
          />

          <Box
            display="flex"
            width="94%"
            gridRow="2/3"
            justifySelf="center"
            alignSelf="center"
          >
            <InputField
              autoFocus
              ref={inputRef}
              placeholder="Enter a message!"
              onKeyPress={e => e.key === "Enter" && send()}
            />
            <IconButton style={{ marginLeft: "0.5rem" }} onClick={send}>
              <SendRounded color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};
