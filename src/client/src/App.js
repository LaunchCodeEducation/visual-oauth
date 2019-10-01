import React from "react";
import { Container, Header, Divider } from "semantic-ui-react";

import VisualOAuth from "./components/VisualOAuth";
import Introduction from "./components/Introduction";

function App() {
  return (
    <Container>
      <Header size="huge" content="Learn OAuth Step-By-Step" />
      <Introduction />

      <Divider />

      <VisualOAuth />
    </Container>
  );
}

export default App;
