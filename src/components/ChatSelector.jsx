import { Box, Fade } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatItem } from "./ChatItem";

const getTimePassed = date => {
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
}) => {
  const [chatItems, setChatItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const formattedChats = chats.map(chat => ({
      author:
        chat.participantNames[0] === currentUser.displayName
          ? chat.participantNames[1]
          : chat.participantNames[0],
      message: chat.lastMessage,
      timestamp: getTimePassed(chat.lastMessageTimestamp) + " ago",
      handleClick: () => history.push(`/connect/${chat.id}`),
    }));
    setChatItems(formattedChats);
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
