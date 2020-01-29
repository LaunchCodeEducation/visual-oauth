import React from "react";
import {
  Header,
  Message,
  Divider,
  Statistic,
  Grid,
  List,
} from "semantic-ui-react";

import EasyLink from "../EasyLink";
import TogglingContent from "../TogglingContent";

const BackgroundContent = () => (
  <section style={{ textAlign: "left" }}>
    <Grid padded container>
      <Grid.Row>
        <Header size="medium">Authentication and Authorization</Header>

        <p>
          In order to learn any new technology we should begin by exploring why
          it exists and what problems it aims to solve. But in order to
          understand the problem we have to learn some key terminology that the
          technology is built on. We will start by introducing two fundamental
          concepts of User interaction in web development -{" "}
          <b>Authentication and Authorization</b>. While these two terms are
          often conflated they each have distinct roles that are integral to how
          OAuth works.
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
                  The mechanism used for an entity (a User or Machine) to prove
                  their identity to a system.
                </p>
                <Grid centered padded>
                  <Statistic size="tiny">
                    <Statistic.Label>Plain English</Statistic.Label>
                    <Statistic.Value>
                      "Prove who you are before continuing"
                    </Statistic.Value>
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
                  The mechanism used to determine if an entity,{" "}
                  <b>after having authenticated</b>, is allowed to access or
                  manage data.
                </p>
                <Grid centered padded>
                  <Statistic size="tiny">
                    <Statistic.Label>Plain English</Statistic.Label>
                    <Statistic.Value>
                      "You're in, but are you allowed to do that?"
                    </Statistic.Value>
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
          There are three ways that an entity can authenticate itself physically
          or digitally. We will be focusing on digital authentication. These
          mechanisms exist along a scale from convenient and simple to demanding
          but secure. On the internet security is often sacrificed in some
          capacity in order to provide a more convenient User experience.{" "}
        </p>
        <p>
          <b>
            The right amount of security is the maximum willing to be tolerated
            by the Users of a system.
          </b>
        </p>
      </Grid.Row>

      <Grid.Row centered>
        <Message
          warning
          header="The Three Factors of Authentication"
          list={[
            <List.Item
              key="knowledge-factor"
              content={
                <span>
                  <b>Knowledge</b>: Something known (a password, secret or pin
                  number)
                </span>
              }
            />,
            <List.Item
              key="ownership-factor"
              content={
                <span>
                  <b>Ownership</b>: Something owned (an application, device or
                  certificate)
                </span>
              }
            />,
            <List.Item
              key="inherence-factor"
              content={
                <span>
                  <b>Inherence</b>: Something inherent (a fingerprint, retina
                  mapping or other biometric source)
                </span>
              }
            />,
          ]}
        />
      </Grid.Row>

      <Grid.Row>
        <Message
          info
          header="Single-Factor Authentication"
          content={
            <>
              <p>
                As the name implies only one of the three factors is used to
                prove identity.{" "}
                <b>
                  The single factor, while convenient, can also be a single
                  point of security failure.
                </b>
              </p>
              <p>
                Most commonly used for <b>Knowledge</b>-based User
                authentication on the internet. A username and password is sent
                in a request to a server which verifies the information matches
                what is stored in its database. This authentication strategy is
                convenient for Users but easy to abuse if an attacker can gain
                access to the Knowledge.
              </p>
            </>
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
                MFA is a more robust form of authentication because it utilizes
                2 (or more) mechanisms to prove identity. For web-based
                authentication the third <b>Inherence</b> form is not usually
                feasible to implement. But <b>Two-Factor Authentication</b> is
                increasingly prevalent in modern web development.
              </p>
              <p>
                However, it is less convenient for Users than a single Knowledge
                factor so it is usually offered as an option{" "}
                <b>(that you should always use for important accounts)</b>.
              </p>
              <p>
                A common example of MFA on the web involves a user submitting
                their login credentials along with <b>something Owned</b>. The
                Known credentials can be coupled with a{" "}
                <b>
                  <EasyLink url="https://authy.com/">
                    Time-Based Authenticator Application (non-affiliated)
                  </EasyLink>
                </b>{" "}
                or a code sent in a cell phone text message.
              </p>
            </>
          }
        />
      </Grid.Row>

      <Grid.Row>
        <Header size="medium">Authorization Strategies</Header>
        <p>
          Once an entity has <b>authenticated</b> itself there are many ways to{" "}
          <b>authorize</b> their request. Generally speaking authorization
          involves some list of permitted actions associated with the entity. In
          its most basic form authorization is implied by the authentication.
          For example, if the entity is able to authenticate as an administrator
          then their authorization is assumed as admin-privileged and they are
          given full access for their requests.
        </p>
        <p>
          But this basic strategy has its flaws in larger systems. When there
          are many entities to keep track of how do you control who has access
          to what and to what degree? Often the concept of <b>scopes</b> are
          used to define <b>access control</b>.
        </p>
      </Grid.Row>

      <Grid.Row centered columns={1}>
        <Grid.Column width={8}>
          <Message
            compact
            info
            header="Scope"
            content={
              <>
                <p>A definition for a degree of access to a type of data</p>
                <Grid centered padded>
                  <Statistic size="tiny">
                    <Statistic.Label>Plain English</Statistic.Label>
                    <Statistic.Value>
                      "A lookup rule for how a type of data can be used"
                    </Statistic.Value>
                  </Statistic>
                </Grid>
              </>
            }
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <p>
          Scopes are categorized according to the{" "}
          <b>resources (types of data)</b> a service exposes. In some cases
          scopes are also sub-categorized with the <b>degree</b> of access to
          the given resource such as reading or writing. These sub-categories
          are often described in terminology relative to the data. For example,
          GitHub's{" "}
          <b>
            <code>repo:invite</code>
          </b>{" "}
          scope allows read and write access to collaborator invitations of a
          repo.
        </p>
        <p>
          Scopes can range from broad to granular depending on how the service
          chooses to define them. They are stored in association to the resource
          they apply to. Entities can then be associated with scopes granted to
          them by the service. Scopes can be assigned and removed from an entity
          as needed to provide fluid and incremental control over data access.
        </p>
      </Grid.Row>
      <Grid.Row centered>
        <Message
          warning
          header="How Scopes Are Used"
          content={
            <section style={{ textAlign: "left" }}>
              <p>
                When an entity issues a request to a service it first
                authenticates itself. From the authentication credentials the
                service can look up the entity and the scopes granted to it. The
                service then compares the scopes of the requested resource to
                the scopes granted to the entity.
              </p>
              <p>
                If the entity has the scope required for the resource access
                they have requested then they are considered <b>authorized</b>{" "}
                and the request is fulfilled.
              </p>
              <p>
                Otherwise the request is rejected. Traditionally by the service
                responding with a{" "}
                <b>
                  <code>403-Forbidden</code>
                </b>{" "}
                status code.
              </p>
            </section>
          }
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
        buttonLabel={sectionLabel}
        content={<BackgroundContent />}
      />
    </>
  );
};
