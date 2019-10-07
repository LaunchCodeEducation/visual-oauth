import React, { useState } from "react";
import { Card, Grid, Button, Divider, Message } from "semantic-ui-react";

import { extractQsParams } from "../utils";

import Step from "./Step";
import stepIcons from "./Step/StepIcon";
import CodeSnippet from "./CodeSnippet";
import BehindTheScenesCode from "./BehindTheScenesCode";
import { TogglingRequestResponseCards } from "./RequestResponseCards";
import { StepDescription, StepInstruction } from "./Step/StepMessage";

const getAccessToken = async (state, setState) => {
  const tokenEndpoint = `${process.env.REACT_APP_API_DOMAIN}/oauth/access_token`;

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    body: JSON.stringify({ code: state.authCode }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch(() =>
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

const GetAccessTokenButton = props => {
  const { authCode } = props.state;

  return (
    <Button
      color="grey"
      disabled={!authCode}
      content={
        authCode
          ? "Exchange Authorization Code for Access Token"
          : "No Authorization Code Found (go to Step 1)"
      }
      onClick={() => getAccessToken(props.state, props.setState)}
    />
  );
};

const StepRequestResponseCards = props => {
  const { responseBody, responseStatusCode } = props;

  const { sent, received, error } = responseBody;

  const requestData = {
    requestBody: sent,
    meta: (
      <span>
        sent from the {stepIcons.backend.inlineCustom("App (Back-end)")}
      </span>
    ),
  };

  const responseData = {
    responseStatusCode,
    responseBody: error || received,
    meta: <span>sent from the {stepIcons.provider.inline}</span>,
  };

  return (
    <TogglingRequestResponseCards
      requestData={requestData}
      responseData={responseData}
    />
  );
};

const ExchangeCodeForTokenStepInstructions = props => {
  const { state } = props;
  const instructions = [
    "Click the button below to send the authorization code to the back-end",
    "You can then view what the front-end sent in its request and what the back-end sent in its response",
    "If the button is disabled then an authorization code is unavailable in the URL and you will need to restart at step 1",
    "Note that the authorization code has an expiration (typically 5-10 minutes) determined by the Provider",
    "If steps 3 and 4 fail due to an expired code you can simply refresh the page and start at step 1 again",
    "If you refresh and start over you may not see the permission dialog on the Provider page (because they were already granted before) and instead will be immediately redirected",
  ];

  const extra = (
    <>
      <Divider hidden />
      <GetAccessTokenButton {...props} />
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

const ExchangeCodeForTokenStep = () => {
  const [state, setState] = useState({
    stepStatus: null,
    responseBody: null,
    networkError: null,
    showRequestCards: false,
    responseStatusCode: null,
    authCode: extractQsParams().code,
  });

  const stepProps = {
    stepNumber: 4,
    statusLabel: "AJAX Request",
    stepStatus: state.stepStatus,
    stepName: "Send Authorization Code to Back-end",
    flowIcons: {
      sourceIcon: "backend",
      targetIcon: "provider",
    },
    // stepCode: <ExchangeCodeForTokenStepCode />,
    // stepDescription: <RedirectStepDescription />,
    stepInstruction: (
      <ExchangeCodeForTokenStepInstructions state={state} setState={setState} />
    ),
  };

  return <Step {...stepProps} />;
};

export default ExchangeCodeForTokenStep;
