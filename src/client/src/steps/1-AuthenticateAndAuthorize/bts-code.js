import React from "react";
import { Header, Divider } from "semantic-ui-react";

import stepIcons from "../../components/Step/StepIcon";
import CodeSnippet from "../../components/CodeSnippet";
import BehindTheScenesCode from "../../components/BehindTheScenesCode";

export const AuthStepCode = () => {
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
  // client_id is a unique identifier issued to the Client when it registers with the Provider
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
