import React from "react";
import PropTypes from "prop-types";
import { Card, Container } from "semantic-ui-react";

const BehindTheScenesCode = props => {
  const { description, snippetContent } = props;

  return (
    <Container style={{ width: "90%" }}>
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
  snippetContent: PropTypes.element.isRequired,
  description: PropTypes.oneOfType([PropTypes.element, PropTypes.node])
    .isRequired,
};

export default BehindTheScenesCode;
