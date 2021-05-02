import { Box, Fade, styled } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatItem } from "./ChatItem";
import { getTimePassed } from "./ChatSelector";

const Input = styled("input")({
  padding: "1rem",
  fontSize: 16,
  outline: "none",
  border: "1px solid #EBBC56",
  transition: "background-color 200ms",

  "&:focus": {
    backgroundColor: "#EBBC5611",
  },
});

export const SearchSelector = ({ selectedItem, chats, currentUser }) => {
  const [chatItems, setChatItems] = useState([]);
  const [searchChatItems, setSearchChatItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  }, [chats, currentUser.uid, currentUser.displayName, history]);

  useEffect(() => {
    if (
      !chatItems ||
      chatItems.length < 1 ||
      searchTerm === "" ||
      !searchTerm
    ) {
      setSearchChatItems([]);
      return;
    }

    const searched = chatItems.filter(
      chat =>
        chat.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(searched);

    setSearchChatItems(searched);
  }, [searchTerm, chatItems]);

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
        <Box display="flex">
          <Input
            placeholder="Search ur heart out cutie"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: "20rem", borderRadius: "1rem" }}
          />
        </Box>

        {searchTerm !== ""
          ? searchChatItems.map((item, key) => (
              <ChatItem
                author={item.author}
                message={item.message}
                timestamp={item.timestamp}
                handleClick={item.handleClick}
                key={key}
              />
            ))
          : chatItems.map((item, key) => (
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
