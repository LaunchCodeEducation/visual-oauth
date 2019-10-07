import React from "react";
import PropTypes from "prop-types";
import { Card, Grid, Divider } from "semantic-ui-react";

import CodeSnippet from "./CodeSnippet";
import TogglingContent from "./TogglingContent";

export const RequestCard = props => {
  const { meta, requestBody } = props;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Request</Card.Header>
        <Card.Meta>{meta}</Card.Meta>
        <Card.Description>
          <CodeSnippet
            language="json"
            snippetString={JSON.stringify(requestBody, null, 2)}
          />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

RequestCard.propTypes = {
  meta: PropTypes.string.isRequired,
  requestBody: PropTypes.string.isRequired,
};

export const ResponseCard = props => {
  const { header, meta, responseBody, responseStatusCode } = props;

  return (
    <Card fluid>
      <Card.Content extra>
        <Card.Header>{header || "Response"}</Card.Header>
        <Card.Meta>{meta}</Card.Meta>
        <Card.Description>
          <Divider
            horizontal
            style={{ color: responseStatusCode === 200 ? "green" : "red" }}
          >
            status code: {responseStatusCode}
          </Divider>
          <CodeSnippet
            language="json"
            snippetString={JSON.stringify(responseBody, null, 2)}
          />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

ResponseCard.propTypes = {
  header: PropTypes.string,
  meta: PropTypes.string.isRequired,
  responseBody: PropTypes.string.isRequired,
  responseStatusCode: PropTypes.number.isRequired,
};

const RequestResponseCards = props => {
  const { requestData, responseData } = props;

  return (
    <Grid centered padded>
      {/* <Grid.Row columns={2}>
        <Grid.Column width={8}> */}
      <RequestCard {...requestData} />
      {/* </Grid.Column> */}
      {/* <Grid.Column width={8}> */}
      <ResponseCard {...responseData} />
      {/* </Grid.Column> */}
      {/* </Grid.Row> */}
    </Grid>
  );
};

RequestResponseCards.propTypes = {
  requestData: RequestCard.propTypes.isRequired,
  responseData: ResponseCard.propTypes.isRequired,
};

export default RequestResponseCards;

export const TogglingRequestResponseCards = props => {
  const { requestData, responseData } = props;

  return (
    <TogglingContent
      buttonLabel="Request &amp; Response Info"
      content={
        <RequestResponseCards
          requestData={requestData}
          responseData={responseData}
        />
      }
    />
  );
};

TogglingRequestResponseCards.propTypes = {
  ...RequestResponseCards.propTypes,
};
