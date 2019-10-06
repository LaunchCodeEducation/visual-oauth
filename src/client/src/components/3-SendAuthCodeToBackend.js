import React, { useState } from "react";
import { Card, Grid, Button, Divider, Message } from "semantic-ui-react";

import { extractQsParams } from "../utils";

import Step from "./Step";
import stepIcons from "./Step/StepIcon";
import CodeSnippet from "./CodeSnippet";
import BehindTheScenesCode from "./BehindTheScenesCode";
import { StepDescription, StepInstruction } from "./Step/StepMessage";
import TogglingContent from "./TogglingContent";

const sendAuthCode = async (state, setState) => {
  const codeEndpoint = `${process.env.REACT_APP_API_DOMAIN}/oauth/code`;

  const response = await fetch(codeEndpoint, {
    method: "POST",
    body: JSON.stringify({ code: state.authCode }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch(error =>
    setState({
      ...state,
      stepStatus: false,
      networkError:
        "Failed to connect to back-end server. Check that the server is running and that it has configured CORS to accept requests from this domain",
    }),
  );

  if (!response) return; // network error

  const responseBody = await response.json();

  return setState({
    ...state,
    responseBody,
    stepStatus: response.ok,
    responseStatusCode: response.status,
  });
};

const SendAuthCodeButton = props => {
  const { authCode } = props.state;

  return (
    <Button
      color="grey"
      disabled={!authCode}
      content={
        authCode
          ? "Send Authorization Code to Back-end"
          : "No Authorization Code Found (go to Step 1)"
      }
      onClick={() => sendAuthCode(props.state, props.setState)}
    />
  );
};

const RequestCard = props => {
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

const ResponseCard = props => {
  const { meta, responseBody, responseStatusCode } = props;

  return (
    <Card>
      <Card.Content extra>
        <Card.Header>Response</Card.Header>
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

const StepRequestResponseCards = props => {
  const { responseBody, responseStatusCode } = props;

  const requestCardProps = {
    requestBody: responseBody.received,
    meta: <span>sent from the {stepIcons.frontend.inline}</span>,
  };

  const responseCardProps = {
    responseBody,
    responseStatusCode,
    meta: <span>sent from the {stepIcons.backend.inline}</span>,
  };

  return (
    <TogglingContent
      buttonLabel="Request &amp; Response Info"
      content={
        <Grid centered padded>
          <Grid.Row columns={2}>
            <Grid.Column width={8}>
              <RequestCard {...requestCardProps} />
            </Grid.Column>
            <Grid.Column width={8}>
              <ResponseCard {...responseCardProps} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
    />
  );
};

const SendAuthCodeStepInstructions = props => {
  const { state } = props;
  const instructions = [
    "Click the button below to send the authorization code to the back-end",
    "You can then view what the front-end sent in its request and what the back-end sent in its response",
    "If the button is disabled then an authorization code is unavailable in the URL and you will need to restart at step 1",
  ];

  const extra = (
    <>
      <Divider hidden />
      <SendAuthCodeButton {...props} />
      {state.responseBody && <StepRequestResponseCards {...state} />}
      {state.networkError && (
        <Message
          error
          size="small"
          header="Network Error"
          content={state.networkError}
        />
      )}
    </>
  );

  return <StepInstruction list={instructions} extra={extra} />;
};

const SendAuthCodeToBackendStep = () => {
  const [state, setState] = useState({
    stepStatus: null,
    responseBody: null,
    networkError: null,
    showRequestCards: false,
    responseStatusCode: null,
    authCode: extractQsParams().code,
  });

  const stepProps = {
    stepNumber: 3,
    statusLabel: "Send HTTP Request",
    stepStatus: state.stepStatus,
    stepName: "Send Authorization Code to Back-end",
    flowIcons: {
      sourceIcon: "frontend",
      targetIcon: "backend",
    },
    // stepDetails: <RedirectStepDetails />,
    // stepDescription: <RedirectStepDescription />,
    stepInstruction: (
      <SendAuthCodeStepInstructions state={state} setState={setState} />
    ),
  };

  return <Step {...stepProps} />;
};

export default SendAuthCodeToBackendStep;
