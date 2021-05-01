import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#EBBC56",
      contrastText: "white",
    },
  },
  shape: { borderRadius: "10" },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "10rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        fontWeight: "600",
        boxShadow: "0 0 5px -1px gray",
      },
      outlined: {
        boxShadow: "none",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      },

      text: {
        boxShadow: "none",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      },
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Roboto', sans-serif",
    },
  },
});

const portalNode = document.getElementById("toaster");

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
    {ReactDOM.createPortal(<Toaster position="bottom-center" />, portalNode)}
  </React.StrictMode>,
  document.getElementById("root")
);
