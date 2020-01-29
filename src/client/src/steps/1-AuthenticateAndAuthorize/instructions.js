import React from "react";
import PropTypes from "prop-types";
import { Button, Divider } from "semantic-ui-react";

import { StepInstruction } from "../../components/Step/StepMessage";

// -- UTILS -- //

// the provider utils below allow for extension of the tool for multiple providers
// the auth button can include a "provider" dropdown that can link to that provider's docs to display the (near identical) similarities across provider ACGF implementations
// the chosen provider will need to be accounted for when sending the auth code to the backend server so it knows which credentials / format to exchange with the provider

const PROVIDERS = {
  // !! register new providers in here
  // add REACT_APP_<PROVIDER>_AUTH_ENDPOINT entry to client client/.env file
  // must be a complete endpoint including qs params (client id, redirect, scopes etc)
  github: "GITHUB",
};

const getAuthEndpoint = provider => {
  const providerEndpointEnvVar = `REACT_APP_${provider}_AUTH_ENDPOINT`;

  return process.env[providerEndpointEnvVar];
};

const redirectToProviderAuthPage = provider => () => {
  window.location.href = getAuthEndpoint(provider);
};

// -- UI COMPONENTS -- //

const AuthButton = props => {
  const { provider } = props;

  return (
    <Button
      color="grey"
      content="Authenticate and Authorize with Provider"
      onClick={redirectToProviderAuthPage(provider)}
    />
  );
};

AuthButton.propTypes = {
  provider: PropTypes.oneOf(Object.values(PROVIDERS)),
};

export const AuthStepInstructions = () => {
  const list = [
    "The Client creates a link to the Provider that has its Client ID and the permission scopes it is requesting attached as querystring parameters",
    "Click the button below to begin the OAuth Authorization Code Grant Flow",
    "The button will send you to the customized Provider link to authenticate and authorize the Client's permission request",
    "After authorizing you will be redirected back to this page and can proceed to step 2",
  ];

  const extra = (
    <>
      <Divider hidden />
      <AuthButton provider={PROVIDERS.github} />
    </>
  );

  return <StepInstruction list={list} extra={extra} />;
};
