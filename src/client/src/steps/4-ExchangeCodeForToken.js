import React, { useState } from "react";
import { Card, Icon, Button, Divider, Message } from "semantic-ui-react";

import { extractQsParams } from "../utils";

import Step from "../components/Step";
import stepIcons from "../components/Step/StepIcon";
import { TogglingRequestResponseCards } from "../components/RequestResponseCards";
import { StepInstruction } from "../components/Step/StepMessage";

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
        sent from the {stepIcons.backend.inlineCustom("Client (Back-end)")}
      </span>
    ),
  };

  const responseData = {
    responseStatusCode,
    // error indicates a network error
    // received is the Provider response and could contain the access token or a Provider error
    responseBody: error || received,
    meta: <span>sent from the {stepIcons.provider.inline}</span>,
  };

  return (
    <>
      {received["access_token"] && (
        <Card fluid centered>
          <Card.Content
            meta="Access Token"
            description={received["access_token"]}
            header={<Icon name="key" color="yellow" size="large" />}
          />
        </Card>
      )}
      {received.error && (
        <Message
          error
          header="Exchange Failed"
          list={[
            "This step failed due to an invalid Auth Code (expired or already used)",
            "Note that the Auth Code may only be used once and has an expiration (typically 5-10 minutes) determined by the Provider",
            "You can view the Provider response error message below",
            "You will need to restart at step 1 to get a new Auth Code",
            "You may not see the permission dialog on the Provider page (because they were already granted before) and instead will be immediately redirected",
          ]}
        />
      )}
      <TogglingRequestResponseCards
        requestData={requestData}
        responseData={responseData}
      />
    </>
  );
};

const ExchangeCodeForTokenStepInstructions = props => {
  const { state } = props;

  const instructions = [
    "In this final step the back-end receives the Auth Code and exchanges it with the Provider for an Access Token",
    "The Client back-end sends a request to the Provider with its authentication credentials (Client ID and Secret), the Auth Code and some additional metadata",
    "Click the button below to initiate the Access Token exchange process",
    "You can then view the request sent by the Client back-end and the response it received from the Provider",
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

const useAccessTokenExchangeState = reportStepStatus => {
  const [state, setStateBase] = useState({
    stepStatus: null,
    responseBody: null,
    networkError: null,
    showRequestCards: false,
    responseStatusCode: null,
    authCode: extractQsParams().code,
  });

  const setStateWrapper = state => {
    reportStepStatus(state.stepStatus);
    return setStateBase(state);
  };

  return [state, setStateWrapper];
};

const ExchangeCodeForTokenStep = props => {
  const { reportStepStatus } = props;

  const [state, setState] = useAccessTokenExchangeState(reportStepStatus);

  const stepProps = {
    stepNumber: 4,
    stepStatus: state.stepStatus,
    statusLabel: "Request Access Token",
    stepLabel: "Step 4: Client Back-end Exchanges Auth Code For Access Token",
    flowIcons: {
      source: {
        icon: "backend",
      },
      target: {
        icon: "provider",
      },
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
