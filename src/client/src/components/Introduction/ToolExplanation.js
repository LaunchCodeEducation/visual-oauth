import React from "react";
import { Header, Divider, Grid, Segment } from "semantic-ui-react";

import { extractQsParams } from "../../utils";

import EasyLink from "../EasyLink";
import TogglingContent from "../TogglingContent";
import { GitHubUserRequestActions } from "../GitHubUserRequestActions";

const ToolExplanationContent = () => (
  <section style={{ textAlign: "left" }}>
    <Grid padded container>
      <Grid.Row>
        <Header size="medium" content="How To Use a Step" />

        <p>
          We will explore how the Authorization Code Grant Flow works by
          visualizing each step of the process. The steps are separated by
          titles that serve as a high level description of the action taking
          place. On the left side of each step is a simple diagram showing the{" "}
          <b>source</b> and <b>destination</b> player involved in the step. You
          can start by scrolling through the titles and diagrams to lay a
          foundation before getting hands-on with the instructions.
        </p>
      </Grid.Row>

      {/* TODO: message descriptors for each player / icon */}

      <Grid.Row>
        <p>
          Next to each flow diagram is a button for viewing the instructions
          associated with the step. Each step will require you to take action in
          order to progress through the OAuth flow. Once the action is taken the
          flow diagram for the step will update to show whether it succeeded or
          failed. Some steps will then display buttons to expand additional
          details about what happened behind the scenes.
        </p>
      </Grid.Row>

      {/* TODO: message descriptors for flow status icon */}

      <Grid.Row>
        <Header size="medium" content="The GitHub OAuth Flow" />
        <p>
          We will be using the{" "}
          <EasyLink
            icon="github"
            label="GitHub OAuth App API"
            url="https://developer.github.com/apps/building-oauth-apps/"
          />{" "}
          as the Provider to visualize the Authorization Code Grant Flow. If you
          are viewing this page on the web then the Visual OAuth App has already
          been registered with GitHub. If you are running Visual Oauth locally
          then you registered your own OAuth App with GitHub and stored your
          App's credentials in the setup script.
        </p>
        <p>
          Below you can test out requesting your public and private User data
          from GitHub. You will notice that GitHub rejects the private data
          request because our App has not yet been authorized by the User (you)
          to do so. By completing the OAuth handshake (in the first four steps)
          GitHub will grant an Access Token to our App. In the final step we
          will use the Access Token granted to our App to issue the privileged
          data request succesfully!
        </p>
      </Grid.Row>
    </Grid>

    <Segment raised>
      <GitHubUserRequestActions />
    </Segment>

    <Divider hidden section />

    {/* mandatory hey arnold gif */}
    <Grid centered>
      <Grid.Row>
        <iframe
          src="https://giphy.com/embed/26Ff4Ci2RNT1H1zb2"
          width="480"
          height="360"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
      </Grid.Row>
      <p>
        <a href="https://giphy.com/gifs/heyarnold-nickelodeon-hey-arnold-26Ff4Ci2RNT1H1zb2">
          via GIPHY
        </a>
      </p>
    </Grid>
  </section>
);

export default props => {
  const { sectionLabel } = props;

  const codeParamPresent = Boolean(extractQsParams().code);
  // on redirect close the explanation section so they can easily scroll to the next step
  const shouldBeVisible = !codeParamPresent;

  return (
    <>
      <Divider
        horizontal
        section
        content={<Header size="huge" content={sectionLabel} />}
      />
      <TogglingContent
        buttonLabel={sectionLabel}
        defaultVisibility={shouldBeVisible}
        content={<ToolExplanationContent />}
      />
    </>
  );
};
