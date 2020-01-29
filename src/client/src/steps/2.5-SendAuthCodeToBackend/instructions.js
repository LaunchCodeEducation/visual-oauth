import React from "react";
import PropTypes from "prop-types";
import { Button, Divider, Message } from "semantic-ui-react";

import { stepFetchRequest } from "../../utils";
import stepIcons from "../../components/Step/StepIcon";
import { StepInstruction } from "../../components/Step/StepMessage";
import { TogglingRequestResponseCards } from "../../components/RequestResponseCards";

const instructionPropTypes = {
  authCode: PropTypes.string,
  responseBody: PropTypes.object,
  networkError: PropTypes.number,
  showRequestCards: PropTypes.bool,
  responseStatusCode: PropTypes.number,
  stepStatus: PropTypes.oneOf([null, true, false]),
};

const sendAuthCode = (state, setState) => {
  const { authCode } = state;

  return stepFetchRequest({
    state,
    setState,
    endpoint: "code",
    body: { code: authCode },
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

const RequestResponseCards = props => {
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

export const SendAuthCodeStepInstructions = props => {
  const { state } = props;
  const instructions = [
    "Now that the Auth Code has been received and extracted it must be sent to the back-end",
    "*Normally the Auth Code is sent to the back-end and immediately exchanged for an Access Token (demonstrated in the next step). But these steps have been separated here so the process is easier to follow",
    "Click the button below to send the Auth Code to the back-end",
  ];

  const extra = (
    <>
      <Divider hidden />
      <SendAuthCodeButton {...props} />

      {/* show req / res cards if request was issued */}
      {state.responseBody && <RequestResponseCards {...state} />}

      {/* show network request if request could not be sent */}
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

SendAuthCodeStepInstructions.propTypes = instructionPropTypes;
