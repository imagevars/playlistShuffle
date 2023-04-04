import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store";
// import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react"

// Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: {
      "#root": {
        
        minHeight: "100vh",
        background: '#ffff'
      },
    },
  },
  // ...other theme customisations
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
