import React from "react";
import { Header, Statistic, Message, Divider, Grid } from "semantic-ui-react";

import EasyLink from "../EasyLink";
import TogglingContent from "../TogglingContent";

const OAuthContent = () => (
  <section style={{ textAlign: "left" }}>
    <Grid padded container>
      <Grid.Row>
        <p>
          OAuth is{" "}
          <EasyLink url="https://oauth.net/2/" label="a web specification" />{" "}
          that describes a process for secure delagation of access to a User's
          data between services. OAuth is at the heart of most User interactions
          on the modern web. In fact you have likely used OAuth many times
          before without realizing it!
        </p>
        <p>
          If the terms <b>Authentication and Authorization</b> sound foreign to
          you then now would be a good time to visit the Authentication &
          Authorization section above. Otherwise you are ready to learn about
          OAuth.
        </p>
      </Grid.Row>

      <Grid.Row centered columns={1}>
        <Grid.Column width={8}>
          <Message
            compact
            info
            header="OAuth"
            content={
              <>
                <p>
                  A protocol that allows a User to securely <b>authorize</b> the
                  delegation of access to their data existing on one service to
                  another service on the internet.
                </p>
                <Grid centered padded>
                  <Statistic size="tiny">
                    <Statistic.Label>Plain English</Statistic.Label>
                    <Statistic.Value>
                      "a process for a User to control how their data in one
                      service can be accessed by another independent service"
                    </Statistic.Value>
                  </Statistic>
                </Grid>
              </>
            }
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <>
          <p>
            Across the hundreds of articles and videos on OAuth there are a
            confusing number of labels, definitions and flow charts that will
            make your eyes cross. The OAuth interaction itself can be confusing
            enough on its own and these added complexities only add insult to
            injury. So we will simplify our definitions and explanations for the
            purpose of this guide. After reading, and experiencing, OAuth you
            will have a solid foundation to take a deeper dive into the details.
          </p>

          <p>
            OAuth as an interaction involving a <b>User</b> and two services -
            the <b>Provider</b> and the <b>App</b>. Note that an App is just a
            third-party or non-Provider service on the web, not necessarily a
            desktop or mobile application. But those labels are a mouthful to
            keep track of so in the spirit of simplicity we will refer to them
            as an App.
          </p>
        </>
      </Grid.Row>

      <Grid.Row columns={2}>
        <Grid.Column width={8}>
          <Message
            info
            header="The Provider"
            content={
              <p>
                A main service the User has registered and created credentials
                for. The Provider holds a User's profile information and any
                other data associated with its service. This data, in whole or
                in part, is what an <b>App</b> has interest in.
              </p>
            }
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Message
            info
            header="The App"
            content={
              <p>
                A third-party service the User wants to use. Most often an App
                needs User data from the <b>Provider</b> for expediting
                registration. But Apps can also extend behavior of, or{" "}
                <b>Integrate</b> with, a Provider service by acting on behalf of
                the User.
              </p>
            }
          />
        </Grid.Column>
      </Grid.Row>

      {/* TODO: consider removing, too wordy */}
      {/* <Grid.Row>
        <p>
          So what exactly can an App do with User data? In the simplest case
          Apps will request to read profile information from the Provider in
          order to expediate their registration process. Afterwards the new
          account is associated with the Provider login instead of traditional
          credentials. But they can also <b>Integrate</b> with a Provider to
          perform actions on behalf of a User. In this case the App will need to
          request to both read and write User data. The App can then interact
          with the User's Provider data beyond basic profile information.
        </p>
        <p>
          For example, the App may provide a customized UI for interacting with
          Provider data. This customization could include new features like
          buttons that automate behavior for the User. When the User clicks the
          button the App will make requests to the Provider on behalf of the
          User. The end effect is the same - User data has been changed - but
          the App automated the actions instead of requiring the User to perform
          them manually. These sorts of features are valuable and convenient to
          the User but require a third-party, the App, to perform
          programatically.
        </p>
      </Grid.Row> */}

      <Header size="medium" content="Why OAuth?" />

      <Grid.Row centered>
        <Message
          warning
          header="The Problems OAuth Aims to Solve"
          list={[
            "Apps need User data for registration",
            "But Users are tired of registering and managing unique accounts for every new service they want to use",
            "Apps need to Integrate with a Provider to customize the User's experience and act on their behalf",
            "But Users do not feel safe sharing their Provider credentials and unrestricted account access with the App",
          ]}
        />
      </Grid.Row>

      <Grid.Row>
        <Header
          size="medium"
          content="Example: Registering Through a Provider"
        />
        <p>
          Consider the case of a User who wants to use a new service. They could
          create yet another set of credentials for that service and add it to
          all of the others they use. But this is inconvenient and with so many
          sites available many Users suffer from <b>signup fatigue.</b>
        </p>

        <p>
          Signup fatigue is when a User is tired of registering and juggling a
          multitude of unique accounts for each service they use. These days
          most Users on the web have one (or more) <b>main service accounts</b>{" "}
          that they use on a daily basis, such as Google, Facebook or GitHub.
          But they don't want the hassle of managing additional accounts. Rather
          than sign up for a new service they often choose to move on
          altogether.
        </p>

        <p>
          In essence this problem boils down to a User who is tired of filling
          out yet another registration form. And an App that needs registration
          data as part of its business requirements. The Provider already has
          the User data but the App needs a way to be <b>authorized</b> by the
          User to access that data.
        </p>
      </Grid.Row>
      <Grid.Row>
        <Header size="medium" content="Example: Integrating With a Provider" />

        <p>
          Let's consider another scenario where a User wants an App to perform
          some actions on their behalf. One of my favorite iOS apps, Apollo (no
          affiliation I just really love it), is a wrapper around Reddit. It
          provides a fantastic user interface and many extra features that
          neither the native Reddit site nor its iOS app support. In order for
          the app to function it needs to be able to read my Reddit data like my
          subreddits and messages. Since I am not on the native Reddit site it
          also needs to be able to act on my behalf like when I want to submit a
          comment through its interface.
        </p>

        <p>
          Once again the App (Apollo) needs to access User (my) data from the
          Provider (Reddit). In this scenario the App now needs both read and
          write access to User data in order to operate. At the same time the
          User needs to be in control over what data access the App has.
          Unrestricted access is a dangerous game that the User should at the
          very least consciously permit.
        </p>

        <p>
          Apollo should not be able to reset my password or delete my account.
          Neither of those are part of its responsibilities. The User (I) should
          be able to <b>authorize specific access</b> for what the App can and
          can not do.
        </p>
      </Grid.Row>

      <Grid.Row>
        <Header size="medium" content="The OAuth Solution" />

        <p>
          In both these scenarios we see three players who are in need of a way
          to delegate access to data. The User could give their Provider
          credentials directly to the App to let it log in and acess all of the
          User data. But we just learned about how important it is for a User to
          protect their authentication credentials. While it would be quick and
          convenient to share these credentials it comes at too great a cost in
          security. Not only would the User be exposing their username and
          password to a third party but they would also be giving implicit
          authorization to the App to do <b>anything it wants</b> to the data
          once it logs in.{" "}
          <b>This is clearly neither a safe nor acceptable mechanism!</b>
        </p>

        <p>
          OAuth is the solution to these problems because it allows for a User
          to securely delegate specific access of its Provider data to an App.
          It allows for an App to request <b>scoped</b> access to the User's
          Provider data and allows the User to review and <b>authorize</b> this
          request. All without ever requiring the User to expose their
          credentials!
        </p>
      </Grid.Row>

      <Grid.Row centered>
        <Message
          warning
          header="All the Players Are Happy"
          list={[
            "The App can request access to the Provider data it needs from the User",
            "The User can review and authorize the requested access without exposing its credentials to the App",
            "The Provider is absolved of liability in sharing the User's data by the User's explicit permission to do so",
            "The User has the ability to revoke the App's access at any time",
            "The App has the right to refuse the use of all or parts of its service depending on what Provider access is revoked",
          ]}
        />
      </Grid.Row>

      <Grid.Row>
        <Header size="medium" content="Access Tokens" />
        <p>
          OAuth accomplishes these solutions through a multi-step process that,
          when succesful, results in the Provider <b>granting</b> the App an{" "}
          <b>Access Token</b>. The App then uses this token to <b>access</b> the
          permitted User data from the Provider. The App may use the Access
          Token for as long as the data access remains granted.
        </p>

        <p>
          An Access Token is a string that is used by the Provider to authorize
          the requests issue by the App. It can be in either an <b>Opaque</b> or{" "}
          <b>Signed</b>
          format. In both cases the Access Token's validity and the context of
          the request are verified by the Provider in determining whether the
          request will be fulfilled.
        </p>
      </Grid.Row>

      <Grid.Row centered columns={2}>
        <Grid.Column>
          <Message
            info
            compact
            header="Opaque Access Token"
            list={[
              "A random string persisted by the Provider in a token database",
              "The Access Token is looked up on every request issued by the App",
              "The lookup determines whether the App's request is authorized depending on permitted scopes associated with it",
              "Revocation of access (by the User or Provider) is instantaneous through removing the identifier from the token database",
              "Does not have an expiration",
              "The need for constant lookups trades scalability for immediate power of revocation",
            ]}
          />
        </Grid.Column>
        <Grid.Column>
          <Message
            info
            compact
            header="Signed Access Token"
            list={[
              "A JWT formatted string containing the scopes permitted to the requesting App",
              "Digitally signed by the Provider to prove authenticity without requiring persistence or lookup when used",
              "Usually has a short period of validity (expiration time)",
              "Revocation of access (by the User or Provider) is fulfilled when the last issued Access Token expires",
              "New Access Tokens are issued through the use of a Refresh Token when the previous Access Token has expired",
            ]}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Header size="medium" content="The Authorization Code Grant Flow" />

        <p>
          OAuth describes several implementation{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://oauth.net/2/grant-types/"
          >
            <b>grant types</b>
          </a>
          , or <b>flows</b>, for supporting many different authorization use
          cases from single and multi-host web applications to mobile
          applications. All of the flows conclude with the creation of the
          Access Token. These flows differ in their mechanisms, and levels of
          security, and should be chosen depending on the design of the App.
        </p>

        <p>
          The most common flow used by web developers is the{" "}
          <b>Authorization Code Grant Flow</b> (ACGF). This flow is used in
          multi-host web applications that serve their <b>Front-end (client)</b>{" "}
          and <b>Back-end (API)</b> separately. Like the Visual OAuth App you
          are using right now!
        </p>
        <p>
          In the ACGF the App has its own identity credentials which it uses to
          authenticate with the Provider. These credentials called the{" "}
          <b>Client ID</b> and <b>Client Secret</b> behave just like a username
          and password. The Provider associates the scopes granted by the User
          to the App by its unique Client ID. It then uses the Access Token
          whenever the App makes a request for User data to look up these scopes
          and authorize the request.
        </p>
      </Grid.Row>

      <Grid.Row centered>
        <Message
          warning
          header="Authorization Code Grant Flow"
          list={[
            "The App registers itself with the Provider to get its own authenticating credentials (Client ID and Secret)",
            "The App creates a link to the Provider page for requesting access from the User",
            "The User authenticates themselves with the Provider and is sent to a permissions page",
            "The Provider page displays the permissions (scopes) the App is requesting for the User to review",
            "The Provider generates a temporary Authorization Code",
            "The User accepts the permissions and is redirected back to the App with the Authorization Code in a query string",
            "The App exchanges the Authorization Code along with its credentials with the Provider",
            "The Provider generates an Access Token and sends it back in its response to the APp",
          ]}
        />
      </Grid.Row>
    </Grid>
  </section>
);

export default props => {
  const { sectionLabel } = props;

  return (
    <>
      <Divider
        horizontal
        section
        content={<Header size="huge" content={sectionLabel} />}
      />
      <TogglingContent
        defaultVisibility={false}
        content={<OAuthContent />}
        buttonLabel={props.sectionLabel}
      />
    </>
  );
};
