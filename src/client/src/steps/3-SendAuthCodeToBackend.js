import React, { useState } from "react";
import { Button, Divider, Message } from "semantic-ui-react";

import { extractQsParams } from "../utils";

import Step from "../components/Step";
import stepIcons from "../components/Step/StepIcon";
import { TogglingRequestResponseCards } from "../components/RequestResponseCards";
import { StepInstruction } from "../components/Step/StepMessage";

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

const StepRequestResponseCards = props => {
  const { responseBody, responseStatusCode } = props;
  const { error, received } = responseBody;

  const requestData = {
    requestBody: received,
    meta: (
      <span>
        sent from the {stepIcons.frontend.inlineCustom("Client (Front-end)")}
      </span>
    ),
  };

  const responseData = {
    responseStatusCode,
    responseBody: { error, received },
    meta: (
      <span>
        sent from the {stepIcons.backend.inlineCustom("Client (Back-end)")}
      </span>
    ),
  };

  return (
    <TogglingRequestResponseCards
      requestData={requestData}
      responseData={responseData}
    />
  );
};

const SendAuthCodeStepInstructions = props => {
  const { state } = props;
  const instructions = [
    "Now that the Auth Code has been received and extracted it must be sent to the back-end",
    "Click the button below to send the Auth Code to the back-end",
    "Normally the Auth Code is sent to the back-end and immediately exchanged for an Access Token (demonstrated in the next step). But these steps have been separated here for demonstration purposes",
    "You can see the front-end request and back-end response below",
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
    statusLabel: "Send Auth Code",
    stepStatus: state.stepStatus,
    stepLabel: "Step 3: Send Auth Code to Back-end",
    flowIcons: {
      source: {
        icon: "frontend",
      },
      target: {
        icon: "backend",
      },
    },
    // stepCode: <SendAuthCodetStepCode />,
    // stepDescription: <RedirectStepDescription />,
    stepInstruction: (
      <SendAuthCodeStepInstructions state={state} setState={setState} />
    ),
  };

  return <Step {...stepProps} />;
};

export default SendAuthCodeToBackendStep;
