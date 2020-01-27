import React from "react";
import { Container, Divider } from "semantic-ui-react";

import VisualOAuth from "./steps";
import Title from "./components/Title";
import Introduction from "./components/Introduction/";

function App() {
  return (
    <Container style={{ margin: "25px", fontSize: "1.2rem" }}>
      <Title />

      <Introduction />

      <Divider hidden />

      <VisualOAuth />
    </Container>
  );
}

export default App;
