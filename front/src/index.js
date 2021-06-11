import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Global
        styles={css`
          #root,
          .App {
            min-eight: 100vh;
            min-width: 100vw;
          }
        `}
      />
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
