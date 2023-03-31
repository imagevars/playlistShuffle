import { Route, Routes } from "react-router-dom";
import "./css/index.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Playlist from './components/Playlist'


function App() {
  return (
    <div className="App  ">
      {/* <header>
        <Navbar />
      </header> */}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route 
        path="playlist/:id"
        element={<Playlist />}
        />
        <Route 
        path="*"
        element={<h1>Error 404</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
