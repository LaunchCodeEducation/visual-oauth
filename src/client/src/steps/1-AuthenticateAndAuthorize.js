import React from "react";
import PropTypes from "prop-types";
import { Header, Button, Divider } from "semantic-ui-react";

import Step from "../components/Step";
import stepIcons from "../components/Step/StepIcon";
import CodeSnippet from "../components/CodeSnippet";
import BehindTheScenesCode from "../components/BehindTheScenesCode";
import {
  StepDescription,
  StepInstruction,
} from "../components/Step/StepMessage";
import { extractQsParams } from "../utils";

//-- util functions --//

const getAuthEndpoint = provider =>
  // ensure uppercase
  process.env[`REACT_APP_${provider.toUpperCase()}_AUTH_ENDPOINT`];

const redirectToProviderAuth = provider => () => {
  window.location.href = getAuthEndpoint(provider);
};

//-- auxiliary components --//

// the provider utils above allow for extension of the tool for multiple providers
// the auth button can include a "provider" dropdown that can link to that provider's docs to display the (near identical) similarities across provider flow implementations
// the chosen provider will need to be accounted for when sending the auth code to the backend server so it knows which credentials / format to exchange with the provider
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

AuthButton.propTypes = {
  // !! register providers in this enum list
  // add REACT_APP_PROVIDER_AUTH_ENDPOINT entry to .env file
  // must be a complete endpoint including qs params (client id, redirect, scopes etc)
  provider: PropTypes.oneOf(["github"]),
};

//-- step components --//

const AuthStepDescription = () => {
  const header = "User authenticates and authorizes through the Provider";

  const list = [
    <>
      The {stepIcons.frontend.inlineCustom("User (through the Front-end)")}{" "}
      follows a link to the {stepIcons.provider.inline} page where they begin by{" "}
      <b>authenticating</b> their identity with their login credentials
    </>,
    <>
      The link includes querystring parameters holding the{" "}
      {stepIcons.backend.inlineCustom("App's (Back-end)")} <b>client ID</b> and{" "}
      <b>redirect URI</b> (<code>?client_id=XXX&amp;redirect_uri=YYY</code>)
    </>,
    <>
      These parameters are used so the {stepIcons.provider.inline} knows which{" "}
      {stepIcons.backend.inlineCustom("App")} is being authorized (
      <b>client ID</b>) and where to send the User (<b>redirect URI</b>) after
      success
    </>,
    <>
      The User chooses to <b>authorize</b> the{" "}
      {stepIcons.backend.inlineCustom("App's")} permission requests by accepting
      them on the {stepIcons.provider.inline} page
    </>,
    <>
      The {stepIcons.provider.inline} then <b>redirects (step 2)</b> to the{" "}
      {stepIcons.frontend.inline} at the <b>redirect URI</b> location
    </>,
    <>
      By using OAuth the User is able to <b>authorize</b> the access /
      management of their {stepIcons.provider.inline} data{" "}
      <b>without exposing their login credentials</b> to the{" "}
      {stepIcons.backend.inlineCustom("App")}
    </>,
  ];

  return <StepDescription header={header} list={list} />;
};

const AuthStepInstruction = () => {
  const list = [
    "Click the button below to begin the OAuth Authorization Code Grant Flow",
    "You will be sent to the Provider page to authenticate and authorize the App's permissions request",
    "After authorizing you will be redirected back to this page and can proceed to step 2",
  ];

  const extra = (
    <>
      <Divider hidden />
      <AuthButton provider="github" />
    </>
  );

  return <StepInstruction list={list} extra={extra} />;
};

const AuthStepCode = () => {
  const description = (
    <span>
      A button with a click event handler that sends the{" "}
      {stepIcons.frontend.inlineCustom("User (through the Front-end)")} to the{" "}
      {stepIcons.provider.inline} page
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
    statusLabel: "Authorize App Permissions",
    stepLabel: "Step 1: Authenticate & Authorize App",
    flowIcons: {
      source: {
        icon: "frontend",
      },
      target: {
        icon: "provider",
      },
    },
    stepCode: <AuthStepCode />,
    stepDescription: <AuthStepDescription />,
    stepInstruction: <AuthStepInstruction />,
    stepStatus: Boolean(extractQsParams().code) || null,
  };

  return <Step {...stepProps} />;
};

export default AuthenticateAndAuthorizeStep;
