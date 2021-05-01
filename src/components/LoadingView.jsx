import { CircularProgress } from "@material-ui/core";
import DefaultLayout from "../layouts/DefaultLayout";

export const LoadingView = () => (
  <DefaultLayout inLoading>
    <CircularProgress />
  </DefaultLayout>
);
