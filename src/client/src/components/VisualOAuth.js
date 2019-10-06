import React from "react";

import Step1 from "./1-AuthenticateAndAuthorize";
import Step2 from "./2-Redirect";
import Step3 from "./3-SendAuthCodeToBackend";
import Step4 from "./4-ExchangeCodeForTokens";

const VisualOAuth = () => {
  return (
    <main>
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
    </main>
  );
};

export default VisualOAuth;
