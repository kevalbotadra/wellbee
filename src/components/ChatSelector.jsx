import { Box, Fade, Typography } from "@material-ui/core";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatItem } from "./ChatItem";

export const getTimePassed = date => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const ChatSelector = ({
  selectedItem,
  chats,
  currentUser,
  focusChat,
  title,
}) => {
  const [chatItems, setChatItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const formattedChats = chats.map(async chat => {
      const formattedChat = await firebase
        .firestore()
        .doc(
          `users/${
            chat.participants[0] === currentUser.uid
              ? chat.participants[1]
              : chat.participants[0]
          }`
        )
        .get()
        .then(user => user.data())
        .then(user => {
          let author;
          if (user.private) author = "Anonymous";
          else author = user.displayName;

          return {
            author,
            message: chat.lastMessage,
            timestamp: getTimePassed(chat.lastMessageTimestamp) + " ago",
            handleClick: () => history.push(`/connect/${chat.id}`),
          };
        });
      return formattedChat;
    });
    Promise.all(formattedChats).then(yes => setChatItems(yes));
  }, [chats, currentUser.uid, focusChat, currentUser.displayName, history]);

  return (
    <Fade in={true}>
      <Box
        height="calc(70vh + 3rem)"
        display="flex"
        flexDirection="column"
        paddingBottom="0"
        marginLeft="2rem"
        gridColumn="3/-1"
        gridGap="1rem"
      >
        <Typography
          variant="h1"
          style={{ fontSize: 28, fontWeight: "bolder", letterSpacing: 0.7 }}
        >
          {title}
        </Typography>
        {chatItems.map((item, key) => (
          <ChatItem
            author={item.author}
            message={item.message}
            timestamp={item.timestamp}
            handleClick={item.handleClick}
            key={key}
          />
        ))}
      </Box>
    </Fade>
  );
};
