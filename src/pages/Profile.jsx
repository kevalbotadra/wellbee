import { Box, Typography } from "@material-ui/core";
import DefaultLayout from "../layouts/DefaultLayout";

const Profile = () => {
  return (
    <DefaultLayout>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(12, 1fr)"
        padding="2rem"
      >
        <Typography
          variant="h1"
          style={{ fontSize: 32, fontWeight: "bolder", gridColumn: "1/-1" }}
        >
          Your Profile
        </Typography>
      </Box>
    </DefaultLayout>
  );
};
export default Profile;
