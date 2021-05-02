import {
  Box,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@material-ui/core";
import {
  Inbox,
  Search,
  SportsHandballOutlined,
  Star,
} from "@material-ui/icons";

export const ConnSelector = ({ selectedItem, setSelectedItem }) => {
  const small = useMediaQuery("(max-width: 1200px)");

  return (
    <Fade in={true}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderRadius="1.2rem"
        boxShadow="0 0 4px -1px gray"
        gridColumn={small ? "1/4" : "1/3"}
        paddingBottom="0"
        position="relative"
      >
        <Box
          height="80px"
          position="absolute"
          width="100%"
          textAlign="center"
          bgcolor="#EBBC5633"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            borderTopRightRadius: "1rem",
            borderTopLeftRadius: "1rem",
          }}
        >
          <img
            height="60px"
            style={{ marginTop: "-5px" }}
            src="/wellbee-bee.svg"
            alt="our mascot!"
          />
        </Box>
        <List>
          <ListItem
            button
            style={{
              marginTop: "8rem",
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
              color: selectedItem === "search" && "#EBBC56",
              borderRight: selectedItem === "search" && "2px solid #EBBC56",
              transition: "color 200ms",
            }}
            onClick={() => setSelectedItem("search")}
          >
            <ListItemIcon>
              <Search
                style={{
                  color: selectedItem === "search" && "#EBBC56",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Search" />
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
              <img
                src="/Robot.png"
                alt="robot"
                width="28px"
                style={{
                  color: selectedItem === "friends" && "#EBBC56",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Robot" />
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
};
