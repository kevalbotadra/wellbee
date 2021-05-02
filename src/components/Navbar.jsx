import { Box, Button, Slide } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const history = useHistory();
  const info = useAuth();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (info === undefined) setCurrentUser(null);
    else setCurrentUser(info.currentUser);
  }, [info]);

  return (
    <Slide in={true}>
      <Box
        margin="1rem 2.5rem"
        boxShadow="0 0 4px -1px gray"
        padding="1rem"
        display="flex"
        bgcolor="#493843"
        color="white"
        justifyContent="space-between"
        borderRadius="20rem"
        alignItems="center"
        style={{ userSelect: "none" }}
      >
        {/* <Typography
        style={{
          fontWeight: "bold",
          fontSize: 28,
          marginLeft: "1.2rem",
          userSelect: "none",
        }}
      >
        wellbee
      </Typography> */}
        <img
          onClick={() => history.push("/")}
          style={{
            marginLeft: "1.2rem",
            cursor: "pointer",
            transition: "filter 200ms",
            "&:hover": { filter: "brightness(0.9)", display: "none" },
          }}
          src="/wellbee.svg"
          height="30"
          alt="the wellbee logo"
        />
        <Box display="flex" style={{}}>
          <Button
            onClick={() => history.push("/")}
            color="white"
            style={{ marginLeft: "1rem", color: "white", letterSpacing: "1px" }}
          >
            Home
          </Button>
          <Button
            onClick={() => history.push("/help")}
            color="white"
            style={{ marginLeft: "1rem", color: "white", letterSpacing: "1px" }}
          >
            Get Help
          </Button>
          {currentUser && (
            <Button
              onClick={() => history.push("/profile")}
              color="white"
              style={{
                marginLeft: "1rem",
                color: "white",
                letterSpacing: "1px",
              }}
            >
              Profile
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => history.push("/connect")}
            style={{
              marginLeft: "2rem",
              marginRight: "1.2rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              letterSpacing: "1px",
            }}
          >
            {currentUser ? "Chats" : "Connect"}
          </Button>
        </Box>
      </Box>
    </Slide>
  );
};

export default Navbar;
