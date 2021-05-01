import React from "react";
import toast from "react-hot-toast";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  const mistakeToast = () =>
    toast.error("Please log in!", { duration: 1500, role: "alert" });

  return (
    <Route
      {...rest}
      render={props => {
        if (currentUser) return <Component {...props} />;
        else {
          mistakeToast();
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
