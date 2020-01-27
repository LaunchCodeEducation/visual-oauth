import React, { useState } from "react";
import {
  Icon,
  Card,
  Grid,
  Button,
  Reveal,
  Header,
  Divider,
} from "semantic-ui-react";

import { extractQsParams } from "../utils";

import Step from "../components/Step";
import stepIcons from "../components/Step/StepIcon";
import CodeSnippet from "../components/CodeSnippet";
import BehindTheScenesCode from "../components/BehindTheScenesCode";
import {
  StepDescription,
  StepInstruction,
} from "../components/Step/StepMessage";

// StepIconFlow expects: null (neutral state), true (success), false (failure)
// authCode may be: null (default, neutral), a string (success), undefined (failure)
// this function ensures that a null (default) value is preserved while converting non null
// values to boolean representations for StepIconFlow to provide the correct indicator
const getStepStatus = authCode =>
  authCode === null ? null : Boolean(authCode);

const checkForAuthCode = setAuthCode => {
  const { code } = extractQsParams();

  return setAuthCode(code);
};

//-- auxiliary components --//

const CheckRedirectSuccessButton = props => {
  const { setAuthCode } = props;

  return (
    <Button
      color="grey"
      content="Check for Authorization Code"
      onClick={() => checkForAuthCode(setAuthCode)}
    />
  );
};

const AuthCodeDisplayWindow = props => {
  const { authCode } = props;

  const hasAuthCode = Boolean(authCode);

  return (
    <Grid centered padded container>
      <Grid.Row>
        <Reveal instant animated="move down" disabled={!hasAuthCode}>
          <Reveal.Content visible>
            <Card>
              <Card.Content
                header={
                  <Icon
                    size="large"
                    name={hasAuthCode ? "lock open" : "lock"}
                  />
                }
                meta={hasAuthCode ? "Auth Code Found!" : "No Auth Code Found"}
                description={
                  hasAuthCode ? "Hover to View" : "Click Above to Check"
                }
              />
            </Card>
          </Reveal.Content>
          <Reveal.Content hidden>
            <Card>
              <Card.Content
                description={authCode}
                meta="Auth Code"
                header={<Icon name="key" color="yellow" size="large" />}
              />
            </Card>
          </Reveal.Content>
        </Reveal>
      </Grid.Row>
    </Grid>
  );
};

//-- step components --//

const RedirectStepDescription = () => {
  const authCodeHeader = "Provider creates an Auth Code";

  const authCodeList = [
    <>
      After the User <b>authorizes</b> the{" "}
      {stepIcons.backend.inlineCustom("Client (Back-end)")} the{" "}
      {stepIcons.provider.inline} generates a string called an <b>Auth Code</b>
    </>,

    <>
      The <b>Auth Code</b> is a temporary token that uniquely identifies the
      permissions that the User granted to the{" "}
      {stepIcons.backend.inlineCustom("Client (Back-end)")}
    </>,

    <>
      The {stepIcons.provider.inline} saves this <b>Auth Code</b> with the{" "}
      <b>client ID</b> of the {stepIcons.backend.inlineCustom("Client (Back-end)")}{" "}
      so it knows which Client is being <b>authorized</b> (discussed in step 4)
    </>,

    <>
      The {stepIcons.provider.inline} appends the <b>Auth Code</b> as a
      querystring parameter (<code>?code=XXX</code>) onto the{" "}
      <b>redirect URI</b> so it is available to the {stepIcons.frontend.inline}{" "}
      after redirection
    </>,
  ];

  const redirectHeader =
    "Provider redirects to the Front-end with the Auth Code";

  const redirectList = [
    <>
      The {stepIcons.provider.inline} redirects to the{" "}
      {stepIcons.frontend.inline} at the <b>redirect URI</b> (with the{" "}
      <b>Auth Code</b> appended)
    </>,

    <>
      In this step the {stepIcons.frontend.inline} code is responsible for
      extracting this <b>Auth Code</b> from the URL so that it can be sent in a
      request to the {stepIcons.backend.inline} (discussed in step 3)
    </>,

    <>
      Recall that the {stepIcons.frontend.inline}, {stepIcons.backend.inline}{" "}
      and
      {stepIcons.provider.inline} are all separated from each other across the
      internet
    </>,

    <>
      The <b>Auth Code</b> is used to transport proof that the authorization
      permissions have been granted from the{" "}
      {stepIcons.frontend.inlineCustom("Front-end (User)")} to the{" "}
      {stepIcons.backend.inline} where it will be used in the next steps
    </>,
  ];

  // return <StepDescription header={header} list={list} />;
  return (
    <>
      <StepDescription header={authCodeHeader} list={authCodeList} />
      <StepDescription header={redirectHeader} list={redirectList} />
    </>
  );
};

const RedirectStepInstruction = props => {
  const { authCode, setAuthCode } = props;

  const list = [
    "After authorizing the Client the Provider generates a temporary Auth Code",
    "In this step the Client must extract this Auth Code so it can be sent to the back-end",
    "Click the button below to check for and retrieve the Auth Code",
    "If step 1 was successful this code will be present as a querystring parameter (?code=XXX) in the URL",
    "You can see the original querystring in your URL bar and the code itself below after it has been extracted",
    "Once the code has been extracted you can proceed to step 3",
  ];

  const extra = (
    <>
      <Divider hidden />
      <CheckRedirectSuccessButton setAuthCode={setAuthCode} />
      <AuthCodeDisplayWindow authCode={authCode} />
    </>
  );

  return <StepInstruction list={list} extra={extra} />;
};

const RedirectBehindTheScenes = () => {
  const description = (
    <span style={{ textAlign: "left" }}>
      The {stepIcons.frontend.inline} extracts the querystring
      <code>code</code> parameter when the redirect page is loaded
    </span>
  );

  const utilityFunctions = `// utility functions (used in Vanilla or React approach)
// these are generic QS utilities that can be used beyond just an OAuth flow

// takes a querystring and turns it into a { key: value, ... } object
// used indirectly through extractQsParams
const shapeQsParams = querystring => {
  // strip the leading '?' character
  // leaving only a param pairs string 'key=value&key2=value2&...'
  const paramPairsString = querystring.replace("?", "");

  // split the param pairs string into an array of individual 'key=value' string pairs
  // then reduce them into an object of { key: value, ... } form
  return paramPairsString.split("&").reduce((paramsObject, paramPairString) => {
    const [key, value] = paramPairString.split("=");

    return { ...paramsObject, [key]: value };
  }, {});
};

// util for extracting the params
const extractQsParams = () => {
  // just the querystring itself, including the leading '?' character
  const querystring = window.location.search;

  // if no qs is present return an empty object
  // so downstream use (expecting an object) isnt broken
  return querystring ? shapeQsParams(querystring) : {};
};
  `;

  const vanillaApproach = `// on this site the trigger for extracting the param is tied to a button click
// in practice it would be tied to the redirect page being loaded / accessed

// this script would ONLY be included in the redirect page HTML
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
  const qsParams = extractQsParams(); // qsParams.code will be the Auth Code

  // logic to submit this code to the Client server (step 3)
});

  `;

  const reactApproach = `class RedirectSuccessView extends React.Component {
  // you may opt for the useEffect() hook if you prefer a more modern approach
  // it is not as intuitive to follow so a class based example is used here instead

  // this lifecycle hook will be executed when the redirect success view is loaded
  // equivalent to the redirect HTML document being loaded in the vanilla approach
  componentDidMount() {
    // as soon as the component mounts check for the code parameter
    const { code } = extractQsParams();

    if (!code) {
      // exit early if the code isnt found
      // logic to update state for redirecting to a login / failure page
    }

    
    // code is present
    // logic to send a request to the Client server (step 3)
  }

  // rest of component / rendering logic
}
  `;

  const snippetContent = (
    <>
      <Divider horizontal section>
        <Header size="small" content="Utility Functions (generic)" />
      </Divider>
      <CodeSnippet language="javascript" snippetString={utilityFunctions} />

      <Divider horizontal section>
        <Header size="small" content="Vanilla JavaScript Implementation" />
      </Divider>
      <CodeSnippet language="javascript" snippetString={vanillaApproach} />

      <Divider horizontal section>
        <Header size="small" content="React Implementation" />
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

// TODO: add message about the flow difference between single server (static client / SSR) vs multi server (SPA/MPA + API)
// const RedirectStepNotes = () => {
//   const header = "Single Server vs Multi-Server";
// };

const RedirectStepCode = () => {
  // TODO: add single vs multi note in details section
  return <RedirectBehindTheScenes />;
};

const RedirectStep = () => {
  const [authCode, setAuthCode] = useState(null);

  const stepProps = {
    statusLabel: "Redirect With Auth Code",
    stepLabel: "Step 2: Extract Auth Code After Redirect",
    flowIcons: {
      source: {
        icon: "provider",
      },
      target: {
        icon: "frontend",
      },
    },
    stepStatus: getStepStatus(authCode),
    stepCode: <RedirectStepCode />,
    stepDescription: <RedirectStepDescription />,
    stepInstruction: (
      <RedirectStepInstruction authCode={authCode} setAuthCode={setAuthCode} />
    ),
  };

  return <Step {...stepProps} />;
};

export default RedirectStep;
