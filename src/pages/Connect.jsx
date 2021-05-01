import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { ChatDisplay } from "../components/ChatDisplay";
import { ChatSelector } from "../components/ChatSelector";
import { ConnSelector } from "../components/ConnSelector";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import DefaultLayout from "../layouts/DefaultLayout";

const Connect = props => {
  const [selectedItem, setSelectedItem] = useState("chat");
  const [activeChat, setActiveChat] = useState("");
  const history = useHistory();
  //   const [chatLoading, setChatLoading] = useState(false);

  const [chats, setChats] = useState([]);
  const [favouriteChats, setFavouriteChats] = useState([]);

  const [userPref, setUserPref] = useState();

  const { currentUser } = useAuth();

  useEffect(() => {
    const userid = currentUser.uid;

    const unsub = firebase
      .firestore()
      .collection("chats")
      .where("participants", "array-contains", userid)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change, index) => {
          if (
            change.type === "added" &&
            index === snapshot.docChanges().length - 1
          )
            console.log(`update ${toast("New messge!")}`);
        });

        if (snapshot.empty) {
          setChats([]);
          return;
        }
        let docs = snapshot.docs;
        docs = docs.map(doc => doc.data());
        docs = docs.sort(
          (a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp
        );

        setChats(docs);
      });

    return unsub;
  }, [currentUser]);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .onSnapshot(snapshot => {
        const pref = snapshot.data();

        if (!snapshot.exists) return;
        console.log(pref);

        setUserPref(pref);
      });

    return unsub;
  }, [currentUser.uid]);

  useEffect(() => {
    if (!userPref) return;
    const favs = userPref.favourites;
    if (!favs) return;
    const favChats = chats.filter(chat => favs.includes(chat.id));
    setFavouriteChats(favChats);
  }, [userPref, chats]);

  useEffect(() => {
    const chatid = props.match.params.chatid;
    setActiveChat(chats.find(chat => chat.id === chatid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const changeSelectedItem = newItem => {
    history.push("/connect");
    setSelectedItem(newItem);
  };

  return (
    <DefaultLayout>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
        <ConnSelector
          selectedItem={selectedItem}
          setSelectedItem={changeSelectedItem}
        />

        {!activeChat ? (
          selectedItem === "chat" ? (
            <ChatSelector
              title="All Chats"
              selectedItem={selectedItem}
              chats={chats}
              currentUser={currentUser}
            />
          ) : selectedItem === "favourites" ? (
            <ChatSelector
              title="Favourite Chats"
              selectedItem={selectedItem}
              chats={favouriteChats}
              currentUser={currentUser}
            />
          ) : null
        ) : (
          <ChatDisplay activeChat={activeChat} userPref={userPref} />
        )}
      </Box>
    </DefaultLayout>
  );
};

export default Connect;
