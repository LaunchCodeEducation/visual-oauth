import React, { useState } from "react";

import Step from "../../components/Step";
import { UseAccessTokenStepInstructions } from "./instructions";

const useStepStatus = () => {
  const [stepStatusState, setStepStatusState] = useState(null);

  // wrapper to get the step status from the internal state of
  // the GitHubUserRequestActions child component
  const setStepStatusFromState = state => {
    const { stepStatus } = state;

    return setStepStatusState(stepStatus);
  };

  return [stepStatusState, setStepStatusFromState];
};

const ExchangeCodeForTokenStep = () => {
  const [stepStatus, setStepStatus] = useStepStatus();

  const stepProps = {
    statusLabel: "Request Private Data",
    stepStatus: stepStatus,
    stepLabel: "After OAuth Flow: Client Uses the Access Token",
    flowIcons: {
      source: {
        icon: "backend",
      },
      target: {
        icon: "provider",
      },
    },
    stepInstruction: (
      <UseAccessTokenStepInstructions setStepStatus={setStepStatus} />
    ),
  };

  return <Step {...stepProps} />;
};

export default ExchangeCodeForTokenStep;
