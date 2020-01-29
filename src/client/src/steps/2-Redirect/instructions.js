import React from "react";
import { Icon, Card, Grid, Button, Reveal, Divider } from "semantic-ui-react";

import { extractQsParams } from "../../utils";
import { StepInstruction } from "../../components/Step/StepMessage";

const checkForAuthCode = setAuthCode => {
  const { code } = extractQsParams();

  return setAuthCode(code);
};

//-- UI components --//

const CheckForAuthCodeButton = props => {
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

export const RedirectStepInstructions = props => {
  const { authCode, setAuthCode } = props;

  const list = [
    "After authorizing the permissions the Provider attaches a temporary Auth Code to the URL that redirects back to the Client",
    "In this step the Client front-end must extract the Auth Code so it can be sent to the back-end",
    "You can see the original querystring in your URL bar and the code itself below after it has been extracted",
    "Click the button below to check for and retrieve the Auth Code then proceed to the next step",
  ];

  const extra = (
    <>
      <Divider hidden />
      <CheckForAuthCodeButton setAuthCode={setAuthCode} />
      <AuthCodeDisplayWindow authCode={authCode} />
    </>
  );

  return <StepInstruction list={list} extra={extra} />;
};
