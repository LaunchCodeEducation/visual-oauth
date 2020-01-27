import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Form } from "semantic-ui-react";

import { ResponseCard } from "../components/RequestResponseCards";
import TogglingContent from "./TogglingContent";

export const useUseAccessTokenState = reportState => {
  const [state, setStateBase] = useState({
    stepStatus: null,
    publicUserData: null,
    privilegedUserData: null,
    publicRequestStatusCode: null,
    privilegedRequestStatusCode: null,
  });

  const setStateWrapper = state => {
    // if a parent component has passed a reportState prop use it
    reportState && reportState(state);
    return setStateBase(state);
  };

  return [state, setStateWrapper];
};

export const buildSetPrivilegedUserData = (state, setState) => (
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

export const buildSetPublicUserData = (state, setState) => (
  publicUserData,
  publicRequestStatusCode,
) =>
  setState({
    ...state,
    publicUserData,
    publicRequestStatusCode,
  });

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
          <label>Access Token</label>
          <input
            type="password"
            value={accessToken}
            onChange={handleChange}
            placeholder="granted in step 4 response"
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

export const GitHubUserRequestActions = props => {
  const { reportState } = props;

  const [state, setState] = useUseAccessTokenState(reportState);
  const setPublicUserData = buildSetPublicUserData(state, setState);
  const setPrivilegedUserData = buildSetPrivilegedUserData(state, setState);

  const {
    publicUserData,
    privilegedUserData,
    publicRequestStatusCode,
    privilegedRequestStatusCode,
  } = state;

  return (
    <Grid centered padded>
      <Grid.Row columns={2}>
        <Grid.Column width={8}>
          <Grid.Row>
            <RequestPublicUserDataForm
              getPublicUserData={getPublicUserData(setPublicUserData)}
            />
          </Grid.Row>
          {publicUserData && (
            <Grid.Row>
              <TogglingContent
                content={
                  <ResponseCard
                    header="Public User Data"
                    responseBody={publicUserData}
                    responseStatusCode={publicRequestStatusCode}
                  />
                }
                buttonLabel="Public User Data"
              />
            </Grid.Row>
          )}
        </Grid.Column>

        <Grid.Column width={8}>
          <Grid.Row>
            <RequestPrivilegedUserDataForm
              getPrivilegedUserData={getPrivilegedUserData(
                setPrivilegedUserData,
              )}
            />
          </Grid.Row>
          {privilegedUserData && (
            <Grid.Row>
              <TogglingContent
                buttonLabel="Privileged User Data"
                content={
                  <ResponseCard
                    header="Privileged User Data"
                    responseBody={privilegedUserData}
                    responseStatusCode={privilegedRequestStatusCode}
                  />
                }
              />
            </Grid.Row>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

GitHubUserRequestActions.propTypes = {};

export default GitHubUserRequestActions;
