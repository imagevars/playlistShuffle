import { Route, Routes } from "react-router-dom";
import "./css/index.css";
import HomePage from "./components/HomePage/HomePage";
import PlaylistPage from "./components/PlaylistPage/PlaylistPage";
import { Container, Heading, Flex } from "@chakra-ui/react";

function App() {
  const baseURL = import.meta.env.BASE_URL;
  console.log(baseURL)
  return (
    <>
      <Routes>
        <Route exact path={`${baseURL}`} element={<HomePage />} />
        <Route path={`${baseURL}/playlist/:id`} element={<PlaylistPage />} />
        <Route
          path={`${baseURL}/*`}
          element={
            <Container>
              <Flex justify={"center"}>
                <Heading>Error 404</Heading>
              </Flex>
            </Container>
          }
        />
      </Routes>
    </>
  );
}

export default App;
