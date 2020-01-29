import React from "react";

import stepIcons from "../../components/Step/StepIcon";
import { StepDescription } from "../../components/Step/StepMessage";

export const AuthStepDescription = () => {
  const header =
    "User authenticates and authorizes the Client through the Provider";

  const list = [
    <>
      The{" "}
      {stepIcons.frontend.inlineCustom("User (through the Client Front-end)")}{" "}
      follows a link to the {stepIcons.provider.inline} page where they begin by{" "}
      <b>authenticating</b> their identity with their login credentials
    </>,
    <>
      The link includes querystring parameters holding the{" "}
      {stepIcons.backend.inlineCustom("Client's")} <b>client ID</b>, a list of
      requested permission <b>scopes</b> and a <b>redirect URI</b> (
      <code>?client_id=XXX&amp;redirect_uri=YYY</code>)
    </>,
    <>
      These parameters are used so the {stepIcons.provider.inline} knows which{" "}
      {stepIcons.backend.inlineCustom("Client")} is being authorized (
      <b>client ID</b>), what access permissions (<b>scopes</b>) it is
      requesting and where to send the User after authorization (
      <b>redirect URI</b>)
    </>,
    <>
      The User chooses to <b>authorize</b> the{" "}
      {stepIcons.backend.inlineCustom("Client's")} permission requests by
      accepting them on the {stepIcons.provider.inline} page
    </>,
    <>
      The {stepIcons.provider.inline} then <b>redirects (step 2)</b> to the{" "}
      {stepIcons.frontend.inline} at the <b>redirect URI</b> location
    </>,
    <>
      In this step the User is able to <b>authorize</b> the access / management
      of their {stepIcons.provider.inline} data{" "}
      <b>without exposing their login credentials</b> to the{" "}
      {stepIcons.backend.inlineCustom("Client")}
    </>,
  ];

  return <StepDescription header={header} list={list} />;
};
