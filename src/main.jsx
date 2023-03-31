import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { store, persistor } from "./store";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
  </BrowserRouter>
);
