import React from "react";

import AuthenticateAndAuthorizeStep from "./1-AuthenticateAndAuthorize";
import RedirectStep from "./2-Redirect";
import SendAuthCodeToAppStep from "./3-SendAuthCodeToApp";
import ExchangeCodeForTokensStep from "./4-ExchangeCodeForTokens";

const VisualOAuth = () => {
  return (
    <main>
      <AuthenticateAndAuthorizeStep />
      <RedirectStep />
      <SendAuthCodeToAppStep />
      <ExchangeCodeForTokensStep />
    </main>
  );
};

export default VisualOAuth;
