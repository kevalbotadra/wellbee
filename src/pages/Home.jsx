import {
  Box,
  Button,
  Grow,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
/* <Button
onClick={() =>
enqueueSnackbar("You've been successfully signed in!", {
autoHideDuration: 1000,
})
}
>
woahwoahwoah
</Button> */
const Home = () => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const small = useMediaQuery("(max-width: 1200px)");

  useEffect(() => setLoaded(true), []);

  return (
    <DefaultLayout>
      <Grow in={loaded}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="2rem"
        >
          <Box marginLeft="2rem" marginBottom="5rem">
            <Typography variant="h2">
              People need <strong>Peers</strong>
            </Typography>
            <Typography
              variant="h5"
              style={{ marginBottom: "3rem", marginTop: "0.5rem" }}
            >
              We connect those in need.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/connect")}
              style={{
                letterSpacing: "1px",
                padding: "0.5rem 2rem",
              }}
            >
              Get Started
            </Button>
          </Box>
          <img
            loading="eager"
            width={small && "50%"}
            src="/yse.png"
            alt="person studying"
          />
        </Box>
      </Grow>
    </DefaultLayout>
  );
};

export default Home;
