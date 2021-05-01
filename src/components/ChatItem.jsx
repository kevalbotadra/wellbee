import { Box, Button, Typography } from "@material-ui/core";
export const ChatItem = ({ author, message, timestamp, handleClick }) => (
  <Button
    style={{
      display: "flex",
      justifyContent: "space-between",
      borderRadius: "1.2rem",
      boxShadow: "0 0 4px -1px gray",
      padding: "1rem 1.5rem",
      width: "100%",
      gridTemplateColumns: "1fr 8fr 1fr",
      cursor: "pointer",
      transition: "box-shadow 200ms",
      textTransform: "none",
    }}
    onClick={handleClick}
  >
    <Box width="12rem" textAlign="left" paddingLeft="0.5rem">
      <Typography style={{ fontWeight: "bold" }} noWrap>
        {author}
      </Typography>
    </Box>
    <Box textAlign="left" width="70%">
      <Typography noWrap>{message}</Typography>
    </Box>

    <Box width="10rem" textAlign="right" paddingLeft="0.5rem">
      <Typography style={{ color: "gray" }} noWrap>
        {timestamp}
      </Typography>
    </Box>
  </Button>
);
