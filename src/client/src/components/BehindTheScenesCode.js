import React from "react";
import PropTypes from "prop-types";
import { Card, Container } from "semantic-ui-react";

import { nodeOrElementType } from "../utils";

const BehindTheScenesCode = props => {
  const { description, snippetContent } = props;

  return (
    <Container style={{ minWidth: "80%" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>Behind the Scenes Code</Card.Header>
          <Card.Meta content={description} />
          <Card.Description content={snippetContent} />
        </Card.Content>
      </Card>
    </Container>
  );
};

BehindTheScenesCode.propTypes = {
  description: nodeOrElementType.isRequired,
  snippetContent: PropTypes.element.isRequired,
};

export default BehindTheScenesCode;
