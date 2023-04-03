import { Route, Routes } from "react-router-dom";
import "./css/index.css";
import HomePage from "./components/HomePage/HomePage";
import PlaylistPage from "./components/PlaylistPage";

function App() {
  const baseURL = import.meta.env.BASE_URL;
  return (
    <>

      <Routes>
        <Route exact path={`${baseURL}`} element={<HomePage />} />
        <Route path={`${baseURL}playlist/:id`} element={<PlaylistPage />} />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </>
  );
}

export default App;
