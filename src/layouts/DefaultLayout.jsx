import { Box } from "@material-ui/core";
import Navbar from "../components/Navbar";

const DefaultLayout = ({ children, overflow }) => {
  return (
    <>
      <Navbar />

      <Box
        padding="1.5rem 3rem"
        style={{ userSelect: "none" }}
        overflow={overflow}
      >
        {children}
      </Box>
    </>
  );
};
export default DefaultLayout;
