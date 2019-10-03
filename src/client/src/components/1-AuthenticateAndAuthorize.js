import React from "react";
import { List, Header, Button, Divider } from "semantic-ui-react";

import Step from "./Step";
import stepIcons from "./Step/StepIcon";
import CodeSnippet from "./CodeSnippet";
import BehindTheScenesCode from "./BehindTheScenesCode";
import { StepDescription, StepInstruction } from "./Step/StepMessage";

//-- util functions --//

const envVarExtractor = provider => param => {
  const [providerUpperCase, paramUpperCase] = [provider, param].map(arg =>
    arg.toUpperCase(),
  );

  return process.env[`REACT_APP_${providerUpperCase}_${paramUpperCase}`];
};

const getOAuthParams = provider => {
  const getProviderParam = envVarExtractor(provider);

  return {
    clientID: getProviderParam("client_id"),
    redirectURI: getProviderParam("redirect_url"),
    authEndpoint: getProviderParam("auth_endpoint"),
  };
};

const redirectToProviderAuth = provider => () => {
  const { authEndpoint, clientID, redirectURI } = getOAuthParams(provider);

  window.location.href = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}`;
};

//-- auxiliary components --//

// the provider utils above allow for extension of the tool for multiple providers
// the auth button can include a "provider" dropdown that can link to that provider's docs to display the (near identical) similarities across provider flow implementations
// the chosen provider will need to be accounted for when sending the auth code to the app server so it knows which credentials / format to exchange with the provider
const AuthButton = props => {
  const { provider } = props;

  return (
    <Button
      color="grey"
      content="Authenticate and Authorize with Provider"
      onClick={redirectToProviderAuth(provider)}
    />
  );
};

//-- step components --//

const AuthStepDescription = () => {
  const header = "User authenticates and authorizes through the Provider";

  const extra = (
    <List divided relaxed="very" style={{ textAlign: "left" }}>
      <List.Item
        content={
          <>
            The {stepIcons.user.inline} follows a link to the{" "}
            {stepIcons.provider.inline} page where they <b>authenticate</b>{" "}
            their identity
          </>
        }
      />
      <List.Item
        content={
          <>
            The link includes querystring parameters with the{" "}
            {stepIcons.app.inlineCustom("App's")} <b>client ID</b> and{" "}
            <b>redirect URI</b>
          </>
        }
      />
      <List.Item
        content={
          <>
            These parameters are used to "brand" the link so the{" "}
            {stepIcons.provider.inline} knows which {stepIcons.app.inline}{" "}
            permissions are being authorized
          </>
        }
      />
      <List.Item
        content={
          <>
            The {stepIcons.user.inline} chooses to <b>authorize</b> the{" "}
            {stepIcons.app.inlineCustom("App's")} permission requests by
            accepting them on the {stepIcons.provider.inline} page
          </>
        }
      />
      <List.Item
        content={
          <>
            The {stepIcons.provider.inline} then <b>redirects (step 2)</b> the{" "}
            {stepIcons.user.inline} to the <b>redirect URI</b> location
          </>
        }
      />
      <List.Item
        content={
          <>
            By using OAuth the {stepIcons.user.inline} is able to{" "}
            <b>authenticate</b> and <b>authorize</b> the access / management of
            their data <b>without exposing their login credentials</b> to the{" "}
            {stepIcons.app.inline}
          </>
        }
      />
    </List>
  );

  return <StepDescription header={header} extra={extra} />;
};

const AuthStepInstruction = () => {
  const list = [
    "Click the button below to begin the OAuth authorization code flow",
    "You will be redirected back to this page afterwards to learn about step 2",
    "The minimal amount of user data from the Provider will be requested",
    "None of this data is stored or used for any purpose beyond displaying it to you in the final step of the flow",
  ];

  const extra = (
    <>
      <Divider hidden />
      <AuthButton />
    </>
  );

  return <StepInstruction list={list} extra={extra} />;
};

const AuthStepDetails = () => {
  const description = (
    <span>
      A button with a click event handler that sends the {stepIcons.user.inline}{" "}
      to the {stepIcons.provider.inline} page
    </span>
  );

  const htmlButton = `<button id="auth-button">Authenticate and Authorize with Provider</button>`;

  const vanillaApproach = `const authButton = document.querySelector("#auth-button");

// add an event listener for the click event
// when the button is clicked the callback function will be executed
authButton.addEventListener("click", (event) => {
  // the provider URL is customized using query string parameters
  // client_id is a unique identifier issued to the App when it registers with the Provider
  // redirect_uri is the location that the User should be redirected to upon successful authentication and authorization
  const providerURL = "https://provider.com/oauth/authenticate?client_id=XXX&redirect_uri=YYY";

  // when the button is clicked (and this function is executed) it will send the User to the Provider page
  window.location.href = providerURL;
});`;

  const reactApproach = `// this site is made using React, here is the same logic using React JSX syntax

const sendToProvider = (event) => {
  const providerURL = "https://provider.com/oauth/authenticate?client_id=XXX&redirect_uri=YYY";

  window.location.href = providerURL;
};

const AuthButton = () => (
  <button onClick={() => sendToProvider()}>Authenticate and Authorize with Provider</button>
);`;

  const snippetContent = (
    <>
      <Divider horizontal section>
        <Header size="small" content="Vanilla HTML / JavaScript" />
      </Divider>
      <CodeSnippet language="html" snippetString={htmlButton} />
      <CodeSnippet language="javascript" snippetString={vanillaApproach} />

      <Divider horizontal section>
        <Header size="small" content="React" />
      </Divider>
      <CodeSnippet language="javascript" snippetString={reactApproach} />
    </>
  );

  return (
    <BehindTheScenesCode
      description={description}
      snippetContent={snippetContent}
    />
  );
};

const AuthenticateAndAuthorizeStep = () => {
  const stepProps = {
    stepNumber: 1,
    stepName: "Authentication & Authorization",
    flowIcons: {
      sourceIcon: "user",
      targetIcon: "provider",
    },
    stepDetails: <AuthStepDetails />,
    stepDescription: <AuthStepDescription />,
    stepInstruction: <AuthStepInstruction />,
  };

  return <Step {...stepProps} />;
};

export default AuthenticateAndAuthorizeStep;
