import { Box, Button } from "@material-ui/core";
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
    <Box
      margin="1rem 2.5rem"
      boxShadow="0 0 4px -1px gray"
      padding="1rem"
      display="flex"
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
        style={{ marginLeft: "1.2rem" }}
        src="/wellbee.svg"
        height="30"
        alt="the wellbee logo"
      />
      <Box display="flex">
        <Button
          onClick={() => history.push("/")}
          style={{ marginLeft: "1rem" }}
        >
          Home
        </Button>
        <Button
          onClick={() => history.push("/help")}
          style={{ marginLeft: "1rem" }}
        >
          Get Help
        </Button>
        {currentUser && (
          <Button
            onClick={() => history.push("/profile")}
            style={{ marginLeft: "1rem" }}
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
          }}
        >
          {currentUser ? "Chats" : "Connect"}
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
