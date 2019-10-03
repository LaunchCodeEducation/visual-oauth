import React, { useState } from "react";
import {
  Icon,
  Card,
  List,
  Grid,
  Button,
  Reveal,
  Header,
  Divider,
} from "semantic-ui-react";

import Step from "./Step";
import stepIcons from "./Step/StepIcon";
import CodeSnippet from "./CodeSnippet";
import BehindTheScenesCode from "./BehindTheScenesCode";
import {
  StepMessage,
  StepDescription,
  StepInstruction,
} from "./Step/StepMessage";

//-- utility functions --//

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

const extractQsParams = () => {
  // just the querystring itself, including the leading '?' character
  const querystring = window.location.search;

  // empty object so downstream use isnt broken if no qs is present
  return querystring ? shapeQsParams(querystring) : {};
};

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
      basic
      color="blue"
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
                meta={hasAuthCode ? "Code Found!" : "No Code Found"}
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
                meta="Authorization Code"
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
  const header = "Provider redirects User with an authorization code";

  const extra = (
    <List divided relaxed="very" style={{ textAlign: "left" }}>
      <List.Item
        content={
          <>
            After the {stepIcons.user.inline} <b>authorizes</b> the{" "}
            {stepIcons.app.inline} the {stepIcons.provider.inline} generates a
            random (temporary) token called an <b>authorization code</b>
          </>
        }
      />
      <List.Item
        content={
          <>
            The {stepIcons.provider.inline} then stores this{" "}
            <b>authorization code</b> and associates it with the{" "}
            <b>client ID</b> of the {stepIcons.app.inline}
          </>
        }
      />

      <List.Item
        content={
          <>
            Later, the {stepIcons.app.inline} will use this{" "}
            <b>authorization code</b> along with its <b>client ID and secret</b>{" "}
            to <b>authenticate</b> itself with the {stepIcons.provider.inline}{" "}
            and complete the OAuth flow (this is discussed in more detail in
            step 4)
          </>
        }
      />
      <List.Item
        content={
          <>
            After generating the <b>authorization code</b> the{" "}
            {stepIcons.provider.inline} redirects the {stepIcons.user.inline} to
            the <b>redirect URI</b> (client site)
          </>
        }
      />
      <List.Item
        content={
          <>
            The {stepIcons.provider.inline} injects the{" "}
            <b>authorization code</b> as a querystring parameter (
            <code>?code=XXX</code>) so it is available to the client site (
            {stepIcons.user.inline}) after redirection
          </>
        }
      />
      <List.Item
        content={
          <>
            In this step the client site ({stepIcons.user.inline}) is
            responsible for extracting this <b>authorization code</b> from the
            URL so that it can be sent in a request to the{" "}
            {stepIcons.app.inlineCustom("App Server")} (step 3)
          </>
        }
      />
      <List.Item
        content={
          <>
            <b>This is one of the most critical steps of the flow.</b> Because
            the client site ({stepIcons.user.inline}),{" "}
            {stepIcons.provider.inline} and {stepIcons.app.inline} are all
            separated from each other the <b>authorization code</b> is used to
            securely confirm that the authorization permissions have been
            granted
          </>
        }
      />
    </List>
  );

  return <StepDescription header={header} extra={extra} />;
};

const RedirectStepInstruction = props => {
  const { authCode, setAuthCode } = props;

  const list = [
    "Click the button below to check for and retrieve the authorization code",
    "If step 1 was successful this code will be present as a querystring parameter ('?code=XXX') in the URL",
    "After extracting the code parameter you can view it below",
    "Note that the authorization code has an expiration (typically 5-10 minutes) determined by the Provider",
    "If steps 3 and 4 fail due to an expired code you can simply refresh the page and start at step 1 again",
    "If you refresh and start over you may not see the permission dialog on the Provider page (because they were already granted before) and instead will be immediately redirected",
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
      The client site ({stepIcons.user.inline}) extracts the querystring
      parameters when the redirect page is loaded
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
  const qsParams = extractQsParams(); // qsParams.code will be the authorization code

  // logic to submit this code to the App server (step 3)
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
    // logic to send a request to the App server (step 3)
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

const RedirectStepDetails = () => {
  // TODO: add message about the flow difference between separate App client / server and an App that serves its own static client

  return <RedirectBehindTheScenes />;
};

const RedirectStep = () => {
  const [authCode, setAuthCode] = useState(null);

  const stepProps = {
    stepNumber: 2,
    stepName: "Redirect & Authorization Code",
    flowIcons: {
      sourceIcon: "provider",
      targetIcon: "user",
    },
    stepStatus: getStepStatus(authCode),
    stepDetails: <RedirectStepDetails />,
    stepDescription: <RedirectStepDescription />,
    stepInstruction: (
      <RedirectStepInstruction authCode={authCode} setAuthCode={setAuthCode} />
    ),
  };

  return <Step {...stepProps} />;
};

export default RedirectStep;
