import React, { useState } from "react";

import Step from "../../components/Step";
import { RedirectStepCode } from "./bts-code";
import { RedirectStepDescription } from "./description";
import { RedirectStepInstructions } from "./instructions";

// StepIconFlow expects: null (neutral state), true (success), false (failure)
// authCode may be: null (default, neutral), a string (success), undefined (failure)
// this function ensures that a null (default) value is preserved while converting non null
// values to boolean representations for StepIconFlow to display the correct icon
const getStepStatus = authCode =>
  authCode === null ? null : Boolean(authCode);

const RedirectStep = () => {
  const [authCode, setAuthCode] = useState(null);

  const stepProps = {
    statusLabel: "Redirect With Auth Code",
    stepLabel: "Step 2: Provider Redirects to Client With Auth Code",
    flowIcons: {
      source: {
        icon: "provider",
      },
      target: {
        icon: "frontend",
      },
    },
    stepStatus: getStepStatus(authCode),
    stepCode: <RedirectStepCode />,
    stepDescription: <RedirectStepDescription />,
    stepInstruction: (
      <RedirectStepInstructions authCode={authCode} setAuthCode={setAuthCode} />
    ),
  };

  return <Step {...stepProps} />;
};

export default RedirectStep;
