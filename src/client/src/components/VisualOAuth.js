import React from "react";

import InitializeStep from "./1-AuthenticateAndAuthorize";
import RedirectStep from "./2-Redirect";
import SendClientCodeStep from "./3-SendAuthCodeToApp";
import GetProviderTokenStep from "./4-ExchangeCodeForTokens";

const VisualOAuth = () => {
  return (
    <div>
      <InitializeStep />
      <RedirectStep />
      <SendClientCodeStep />
      <GetProviderTokenStep />
    </div>
  );
};

export default VisualOAuth;
