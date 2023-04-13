import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import PlaylistPage from "./components/PlaylistPage/PlaylistPage";
import { Container, Heading, Flex } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Routes>
        <Route exact path={`/`} element={<HomePage />} />
        <Route exact path={`playlist/:id`} element={<PlaylistPage />} />
        <Route
          path={`/*`}
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
