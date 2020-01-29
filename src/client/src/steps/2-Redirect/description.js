import React from "react";

import stepIcons from "../../components/Step/StepIcon";
import { StepDescription } from "../../components/Step/StepMessage";

export const RedirectStepDescription = () => {
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
      <b>client ID</b> of the{" "}
      {stepIcons.backend.inlineCustom("Client (Back-end)")} so it knows which
      Client is being <b>authorized</b> (discussed in step 3)
    </>,

    <>
      The {stepIcons.provider.inline} appends the <b>Auth Code</b> as a
      querystring parameter (<code>?code=XXX</code>) onto the{" "}
      <b>redirect URI</b> so it is available to the {stepIcons.frontend.inline}{" "}
      after redirection
    </>,
  ];

  const redirectHeader =
    "Provider redirects to the Client Front-end with the Auth Code";

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

  return (
    <>
      <StepDescription header={authCodeHeader} list={authCodeList} />
      <StepDescription header={redirectHeader} list={redirectList} />
    </>
  );
};
