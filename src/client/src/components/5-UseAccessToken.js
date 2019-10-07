import React, { useState } from "react";
import PropTypes from "prop-types";

import { Card, Grid, Button, Divider, Message, Form } from "semantic-ui-react";

import { extractQsParams } from "../utils";

import Step from "./Step";
import stepIcons from "./Step/StepIcon";
import CodeSnippet from "./CodeSnippet";
import BehindTheScenesCode from "./BehindTheScenesCode";
import {
  TogglingRequestResponseCards,
  ResponseCard,
} from "./RequestResponseCards";
import { StepDescription, StepInstruction } from "./Step/StepMessage";

const getPrivilegedUserData = setPrivilegedUserData => async accessToken => {
  const response = await fetch(
    `${process.env.REACT_APP_API_DOMAIN}/oauth/user_data`,
    {
      method: "POST",
      body: JSON.stringify({ accessToken }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  return setPrivilegedUserData(data, response.status);
};

const getPublicUserData = setPublicUserData => async username => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();

  return setPublicUserData(data, response.status);
};

const RequestPrivilegedUserDataForm = props => {
  const { getPrivilegedUserData } = props;

  const [accessToken, setAccessToken] = useState("");
  const handleChange = event => setAccessToken(event.target.value);

  return (
    <Grid centered>
      <Form>
        <Form.Field>
          <label>Access Token (from step 4)</label>
          <input
            type="password"
            value={accessToken}
            onChange={handleChange}
            placeholder="copy from step 4 response"
          />
        </Form.Field>
        <Form.Button
          content="Request Privileged User Data"
          onClick={() => getPrivilegedUserData(accessToken)}
        />
      </Form>
    </Grid>
  );
};

RequestPrivilegedUserDataForm.propTypes = {
  getPrivilegedUserData: PropTypes.func.isRequired,
};

const RequestPublicUserDataForm = props => {
  const { getPublicUserData } = props;

  const [username, setUsername] = useState("");
  const handleChange = event => setUsername(event.target.value);

  return (
    <Grid centered>
      <Form>
        <Form.Field>
          <label>GitHub User Name</label>
          <input type="text" value={username} onChange={handleChange} />
        </Form.Field>
        <Form.Button
          content="Request Public User Data"
          onClick={() => getPublicUserData(username)}
        />
      </Form>
    </Grid>
  );
};

RequestPublicUserDataForm.propTypes = {
  getPublicUserData: PropTypes.func.isRequired,
};

const UseAccessTokenStepInstructions = props => {
  const { state, setPrivilegedUserData, setPublicUserData } = props;
  const {
    publicUserData,
    privilegedUserData,
    publicRequestStatusCode,
    privilegedRequestStatusCode,
  } = state;

  const instructions = [
    "Copy the access token from the step 4 response",
    "Paste it below to request privileged User data. This data is only accessible by requesters with an access token containing the required privilege scope (read:user)",
    "Then enter your username to request public User data. This data is accessible to anyone on the internet",
    "You can view the responses below to compare the privileged vs. public User data",
    "Notice that the privileged User data contains private information like 'private_gists' and 'private_repo_count' that the Provider does not expose publicly",
  ];

  const extra = (
    <Grid centered padded>
      <Grid.Row columns={2}>
        <Grid.Column>
          <RequestPrivilegedUserDataForm
            getPrivilegedUserData={getPrivilegedUserData(setPrivilegedUserData)}
          />
        </Grid.Column>
        <Grid.Column>
          <RequestPublicUserDataForm
            getPublicUserData={getPublicUserData(setPublicUserData)}
          />
        </Grid.Column>
      </Grid.Row>
      {privilegedUserData && (
        <Grid.Row>
          <ResponseCard
            header="Privileged User Data"
            responseBody={privilegedUserData}
            responseStatusCode={privilegedRequestStatusCode}
          />
        </Grid.Row>
      )}

      {publicUserData && (
        <Grid.Row>
          <ResponseCard
            header="Public User Data"
            responseBody={publicUserData}
            responseStatusCode={publicRequestStatusCode}
          />
        </Grid.Row>
      )}
    </Grid>
  );

  return <StepInstruction list={instructions} extra={extra} />;
};

const ExchangeCodeForTokenStep = () => {
  const [state, setState] = useState({
    stepStatus: null,
    publicUserData: null,
    privilegedUserData: null,
    publicRequestStatusCode: null,
    privilegedRequestStatusCode: null,
  });

  const setPrivilegedUserData = (
    privilegedUserData,
    privilegedRequestStatusCode,
  ) =>
    setState({
      ...state,
      privilegedUserData,
      privilegedRequestStatusCode,
      // a single message property indicates an error from GitHub
      stepStatus: privilegedRequestStatusCode === 200,
    });

  const setPublicUserData = (publicUserData, publicRequestStatusCode) =>
    setState({
      ...state,
      publicUserData,
      publicRequestStatusCode,
    });

  const stepProps = {
    stepNumber: "After OAuth",
    statusLabel: "AJAX Request",
    stepStatus: state.stepStatus,
    stepName: "(After OAuth) Using the Access Token",
    flowIcons: {
      sourceIcon: "backend",
      targetIcon: "provider",
    },
    // stepCode: <UseAccessTokenStepCode />,
    // stepDescription: <RedirectStepDescription />,
    stepInstruction: (
      <UseAccessTokenStepInstructions
        state={state}
        setPublicUserData={setPublicUserData}
        setPrivilegedUserData={setPrivilegedUserData}
      />
    ),
  };

  return <Step {...stepProps} />;
};

export default ExchangeCodeForTokenStep;
