import React from "react";
import { Header, Message, List, Statistic, Grid } from "semantic-ui-react";

const Introduction = () => {
  return (
    <article>
      <Grid>
        <Grid.Row>
          <Header size="medium">Authentication and Authorization</Header>

          <p>
            In order to understand any new technology we should begin by
            understanding why it exists and what problems it aims to solve. We
            will start by exploring two fundamental concepts used in web
            development - <b>authentication and authorization</b>. While these
            two terms are often conflated they each have distinct roles that
            form the basis of the problem OAuth aims to solve.
          </p>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Message
              compact
              info
              header="Authentication"
              content={
                <>
                  <p>
                    The mechanism used for an entity (typically a User) to prove
                    their identity
                  </p>
                  <Grid centered padded>
                    <Statistic size="tiny">
                      <Statistic.Label>Plain English</Statistic.Label>
                      <Statistic.Value>"Prove who you are"</Statistic.Value>
                    </Statistic>
                  </Grid>
                </>
              }
            />
          </Grid.Column>

          <Grid.Column width={8}>
            <Message
              compact
              info
              header="Authorization"
              content={
                <>
                  <p>
                    The mechanism used to determine if an entity is allowed to
                    access or manage data
                  </p>
                  <Grid centered padded>
                    <Statistic size="tiny">
                      <Statistic.Label>Plain English</Statistic.Label>
                      <Statistic.Value>"Are you allowed?"</Statistic.Value>
                    </Statistic>
                  </Grid>
                </>
              }
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Header size="medium">Authentication Strategies</Header>
          <p>
            On the internet there are several ways that an entity can
            authenticate itself. Understanding the procedures that exist
            alongside OAuth will help rationalize what vacancy it fills.
          </p>
        </Grid.Row>

        <Grid.Row centered>
          <Message
            warning
            header="The Three Factors of Authentication"
            list={[
              "Knowledge: Something known (a password or pin number)",
              "Ownership: Something owned (an application or cell phone)",
              "Inherence: Something inherent (a fingerprint or other physical source)",
            ]}
          />
        </Grid.Row>

        <Grid.Row>
          <Message
            info
            header="Single-Factor: Basic Authentication"
            content={
              <p>
                Most commonly used for User authentication, uses the login
                credentials of the entity to prove identity. A username and
                password is sent in a request to a server which verifies their
                information for a match.
              </p>
            }
          />
        </Grid.Row>

        <Grid.Row>
          <Message
            info
            header="Multi-Factor Authentication (MFA)"
            content={
              <>
                <p>
                  MFA is a more robust form of <b>Basic Authentication</b>. It
                  is an increasingly prevalent form of authentication in modern
                  web development. For most common use cases the third{" "}
                  <b>inherence</b> form is not feasible to implement.
                </p>
                <p>
                  In this procedure the user submits their login credentials and
                  couples it with another device as an extra protection.
                  Typically a browser is coupled with an{" "}
                  <b>Authenticator Application</b> or a code sent in a cell
                  phone text message.
                </p>
              </>
            }
          />
        </Grid.Row>

        <Grid.Row>
          <Header size="medium" content="The Auth Problem" />
          <p>
            The problem with these discreet forms of authentication and
            authorization is that they involve direct communication between an
            entity and a verifier. Consider the case of a User who wants to use
            a new service. They could create credentials for that service along
            with all of the others they subscribe to. But this is inconvenient
            and many Users suffer from <b>sign up fatigue.</b>
          </p>

          <p>
            Signup fatigue is when a User is tired of registering and managing
            hundreds of accounts for different services. Rather than sign up for
            a new service they choose to move on. These days most Users on the
            web have one (or more) <b>main service</b> accounts that they use on
            a daily basis, such as Google, Facebook or GitHub.
          </p>

          <p>
            These services are often offered as identity or integration
            applications. Identity may be used in the case of a User simply
            registering for a site. Integration applications provide extra
            behavior on one of the <b>main services</b> like notifications,
            custom interfaces and other automations{" "}
          </p>

          <p>
            To prepare us for understanding the OAuth solution let's label these
            two types of services:
          </p>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Message
              info
              header="The Provider"
              content={
                <p>
                  Services the User is already registered on with data that
                  another service has interest in. This will be something like a
                  Google or a GitHub profile and all its associated data.
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
                  Services the User is interested in joining. The App needs the
                  User to share access and/or management of <b>Provider</b> data
                  in order to register and use it. The App needs profile data or
                  other management access to provide their services to the User.
                </p>
              }
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Message
            warning
            header="The Problems OAuth Needs to Solve"
            list={[
              "Users are fatigued from registering and managing unique accounts for every new service",
              "Users need to conditionally grant permission to App services to access and/or manage their data on Provider services",
              "Users are not comfortable sharing their Provider service credentials with an App (a third party service)",
            ]}
          />
        </Grid.Row>

        <Grid.Row>
          <Header size="medium" content="The OAuth Solution" />

          <p>
            OAuth is{" "}
            <a
              href="https://oauth.net/2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              a specification
            </a>{" "}
            that directly solves the issues raised by previous{" "}
            <b>authentication</b> and <b>authorization</b> processes. It uses a
            multi-step <b>"handshake"</b> involving the User along with the App
            and Provider services. It offers a secure mechanism for Users to
            securely and <b>controllably</b> provide access and management of
            their Provider data without{" "}
            <b>ever exposing their credentials to the App.</b>
          </p>

          <p>
            OAuth offers several implementation <b>"flows"</b> for handling many
            different use cases from single and multi-server web applications to
            mobile applications. While these flows differ in their mechanisms
            and levels of security the most popular in use is the{" "}
            <b>Authorization Code Grant Flow.</b>
          </p>

          <p>
            In this tool we will explore the authorization code flow in a
            step-by-step way. This flow is increasingly popular among modern
            multi-server web applications that separate their{" "}
            <b>Front-end (client)</b> from their <b>Back-end (server)</b> code
            bases.
          </p>
        </Grid.Row>

        <Grid.Row>
          <Message
            warning
            header="Authorization Code [grant] Flow"
            list={[
              "User authenticates their identity with a Provider",
              "User accepts the data access / management permissions requested by the App",
              "App authenticates its identity with the Provider and is given a temporary access token",
              "App uses and (typically) refreshes this access token to make authorized requests, on behalf of the permitting User, for data access / management on the Provider",
            ]}
          />
        </Grid.Row>
      </Grid>
    </article>
  );
};

export default Introduction;
