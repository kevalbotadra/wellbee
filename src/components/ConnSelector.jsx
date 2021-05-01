import {
  Box,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Inbox,
  Person,
  SportsHandballOutlined,
  Star,
} from "@material-ui/icons";

export const ConnSelector = ({ selectedItem, setSelectedItem }) => (
  <Fade in={true}>
    <Box
      height="70vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius="1.2rem"
      boxShadow="0 0 4px -1px gray"
      padding="3rem 0"
      gridColumn="1/3"
      paddingTop="3rem"
      paddingBottom="0"
    >
      <List>
        <ListItem
          button
          style={{
            height: "50px",
            paddingLeft: "2rem",
            borderRadius: "none !important",
            marginBottom: "1rem",
            color: selectedItem === "chat" && "#EBBC56",
            borderRight: selectedItem === "chat" && "2px solid #EBBC56",
            transition: "color 200ms",
          }}
          onClick={() => setSelectedItem("chat")}
        >
          <ListItemIcon>
            <Inbox
              style={{
                color: selectedItem === "chat" && "#EBBC56",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
        <ListItem
          button
          style={{
            height: "50px",
            paddingLeft: "2rem",
            borderRadius: "none !important",
            marginBottom: "1rem",
            color: selectedItem === "favourites" && "#EBBC56",
            borderRight: selectedItem === "favourites" && "2px solid #EBBC56",
            transition: "color 200ms",
          }}
          onClick={() => setSelectedItem("favourites")}
        >
          <ListItemIcon>
            <Star
              style={{
                color: selectedItem === "favourites" && "#EBBC56",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Favourites" />
        </ListItem>
        <ListItem
          button
          style={{
            height: "50px",
            paddingLeft: "2rem",
            borderRadius: "none !important",
            marginBottom: "1rem",
            color: selectedItem === "friends" && "#EBBC56",
            borderRight: selectedItem === "friends" && "2px solid #EBBC56",
            transition: "color 200ms",
          }}
          onClick={() => setSelectedItem("friends")}
        >
          <ListItemIcon>
            <Person
              style={{
                color: selectedItem === "friends" && "#EBBC56",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItem>
      </List>

      <ListItem
        button
        style={{
          height: "69px",
          paddingLeft: "2rem",
          borderRadius: "none !important",
          borderBottomLeftRadius: "1.2rem",
          borderBottomRightRadius: "1.2rem",
          borderTop: "1px solid #EBBC56",
          color: "#b18e42",
          backgroundColor: "#EBBC5633",
        }}
      >
        <ListItemIcon>
          <SportsHandballOutlined />
        </ListItemIcon>
        <ListItemText>Find Friends</ListItemText>
      </ListItem>
    </Box>
  </Fade>
);
