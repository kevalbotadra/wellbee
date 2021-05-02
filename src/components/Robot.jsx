import {
  Box,
  Button,
  CircularProgress,
  Grow,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export const Robot = () => {
  const small = useMediaQuery("(max-width: 1200px)");

  const [loadingButton, setLoadingButton] = useState(false);
  const [gptResponse, setGptResponse] = useState("");

  const ref = useRef();

  const sendQuery = () => {
    const prompt = ref.current.value;

    if (!prompt || prompt.length < 5)
      return toast.error("Please enter a prompt or a longer prompt");

    setLoadingButton(true);

    // send the query

    axios
      .post("http://127.0.0.1:8000/gpt3", {
        secret: "CONGPilDnoMinEThonYAnkoLViTypOlmStOd",
        inputs: [prompt],
      })
      .then(response => setGptResponse(response.data))
      .then(() => setLoadingButton(false));
  };

  return (
    <Grow in={true}>
      <Box
        height="calc(70vh + 3rem)"
        borderRadius="1.2rem"
        padding="0"
        marginTop="5rem"
        gridColumn={small ? "4/-1" : "3/-1"}
        paddingBottom="0"
        marginLeft="2rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography
          variant="h1"
          style={{ fontSize: "32px", fontWeight: "bold" }}
        >
          Friendly Robot: BeeBot
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Who am I?"
          inputRef={ref}
          label="query"
          style={{ width: "50%", marginTop: "2rem", marginBottom: "2rem" }}
        />
        {loadingButton ? (
          <Button color="primary" variant="contained">
            <CircularProgress color="secondary" />
          </Button>
        ) : (
          <Button color="primary" variant="contained" onClick={sendQuery}>
            Submit
          </Button>
        )}

        {gptResponse && (
          <Box marginTop="3rem" width="20rem">
            <Typography style={{ fontSize: "18px", fontWeight: "normal" }}>
              {gptResponse}
            </Typography>
          </Box>
        )}
      </Box>
    </Grow>
  );
};
