import { Route, Routes } from "react-router-dom";
import "./css/index.css";
import Home from "./components/Home";
import PlaylistPage from "./components/PlaylistPage";

function App() {
  const baseURL = import.meta.env.BASE_URL;
  return (
    <div className="App  ">

      <Routes>
        <Route exact path={`${baseURL}`} element={<Home />} />
        <Route path={`${baseURL}playlist/:id`} element={<PlaylistPage />} />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
