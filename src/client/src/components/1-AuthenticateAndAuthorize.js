import React from "react";
import { Button } from "semantic-ui-react";

const extractProviderParam = provider => param => {
  const [providerUpperCase, paramUpperCase] = [provider, param].map(arg =>
    arg.toUpperCase(),
  );

  return process.env[`REACT_APP_${providerUpperCase}_${paramUpperCase}`];
};

const getOAuthParams = provider => {
  const providerParamExtractor = extractProviderParam(provider);

  return {
    clientID: providerParamExtractor("client_id"),
    redirectURI: providerParamExtractor("redirect_url"),
    authEndpoint: providerParamExtractor("auth_endpoint"),
  };
};

const redirectToProviderAuth = provider => () => {
  const { authEndpoint, clientID, redirectURI } = getOAuthParams(provider);

  window.location.href = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}`;
};

const AuthButton = props => {
  const { provider } = props;

  return (
    <Button
      content="Authenticate and Authorize"
      onClick={() => redirectToProviderAuth(provider)}
    />
  );
};

const AuthenticateAndAuthorize = () => {
  return <div></div>;
};

export default AuthenticateAndAuthorize;
