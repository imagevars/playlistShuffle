import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import PlaylistPage from "./components/PlaylistPage/PlaylistPage";
import "./app.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path={`/`} element={<HomePage />} />
        <Route exact path={`playlist/:id`} element={<PlaylistPage />} />
      </Routes>
    </>
  );
}

export default App;
