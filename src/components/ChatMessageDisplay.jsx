import { Avatar, Box, Typography } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { emojify } from "react-emoji";

export const ChatMessageDisplay = ({ messages, uid }) => {
  const dumdumRef = useRef();

  useEffect(() => dumdumRef.current.scrollIntoView({ behavior: "smooth" }));
  return (
    <Box overflow="auto" gridRow="1/2" width="100%" height="100%">
      {messages.map(message => {
        if (message.from === uid)
          return (
            <Box
              display="flex"
              flexDirection="row-reverse"
              alignSelf="right"
              alignItems="center"
              margin="1rem"
              marginRight="2rem"
            >
              <Avatar />
              <Box
                borderRadius="10rem"
                bgcolor="#F4F6F6"
                padding="0.6rem 1.3rem"
                marginRight="1rem"
              >
                <Typography style={{ textAlign: "right" }}>
                  {emojify(message.content, {
                    emojiType: "emojione",
                    attributes: {
                      height: "18px",
                      width: "18px",
                      style: { marginBottom: "-4px" },
                    },
                  })}
                </Typography>
              </Box>
            </Box>
          );
        else
          return (
            <Box
              display="flex"
              flexDirection="row"
              alignSelf="right"
              alignItems="center"
              margin="1rem"
              marginLeft="2rem"
            >
              <Avatar />
              <Box
                borderRadius="10rem"
                bgcolor="#FFF"
                border="2px solid #e9eded"
                padding="0.6rem 1.3rem"
                marginLeft="1rem"
              >
                <Typography style={{ textAlign: "left" }}>
                  {emojify(message.content, {
                    emojiType: "emojione",
                    attributes: {
                      height: "18px",
                      width: "18px",
                      style: { marginBottom: "-4px" },
                    },
                  })}
                </Typography>
              </Box>
            </Box>
          );
      })}
      <Box id="dumdum" ref={dumdumRef} />
    </Box>
  );
};
