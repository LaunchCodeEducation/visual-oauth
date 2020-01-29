import React from "react";

import Step from "../../components/Step";
import { extractQsParams } from "../../utils";
import { AuthStepCode } from "./bts-code";
import { AuthStepDescription } from "./description";
import { AuthStepInstructions } from "./instructions";

const AuthenticateAndAuthorizeStep = () => {
  const stepProps = {
    statusLabel: "Authorize Client Permissions",
    stepLabel: "Step 1: User Authenticates & Authorizes the Client",
    flowIcons: {
      source: {
        icon: "frontend",
      },
      target: {
        icon: "provider",
      },
    },
    stepCode: <AuthStepCode />,
    stepDescription: <AuthStepDescription />,
    stepInstruction: <AuthStepInstructions />,
    // change status after redirect if code is present
    stepStatus: Boolean(extractQsParams().code) || null,
  };

  return <Step {...stepProps} />;
};

export default AuthenticateAndAuthorizeStep;
