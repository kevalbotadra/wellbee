import {
  Box,
  Fade,
  styled,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";
import { ChatItem } from "./ChatItem";
import { getTimePassed } from "./ChatSelector";
import { SimpleLoadingView } from "./LoadingView";

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
  const small = useMediaQuery("(max-width: 1200px)");
  const [loading, setLoading] = useState(true);

  const [chatItems, setChatItems] = useState([]);
  const [searchChatItems, setSearchChatItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    Promise.all(formattedChats)
      .then(yes => setChatItems(yes))
      .then(() => setLoading(false));
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
        gridColumn={small ? "4/-1" : "3/-1"}
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

        {loading && <SimpleLoadingView />}
        {chatItems.length === 0 && !loading && (
          <>
            <Typography
              variant="h2"
              style={{ fontSize: 22, fontWeight: "bolder", letterSpacing: 0.7 }}
            >
              No chats right now :(
            </Typography>
            <Typography
              variant="p"
              style={{ fontSize: 18, fontWeight: "normal", letterSpacing: 0.7 }}
            >
              Press <strong>find friends</strong> to start a chat!
            </Typography>
          </>
        )}
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
