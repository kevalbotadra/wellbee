import { Box, CircularProgress } from "@material-ui/core";
import DefaultLayout from "../layouts/DefaultLayout";

export const LoadingView = () => (
  <DefaultLayout inLoading>
    <Box
      width="100%"
      height="60vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="primary" />
    </Box>
  </DefaultLayout>
);

export const SimpleLoadingView = () => (
  <Box
    width="100%"
    height="60vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <CircularProgress color="primary" />
  </Box>
);
