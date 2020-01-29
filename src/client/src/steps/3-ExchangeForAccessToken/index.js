import React, { useState } from "react";

import Step from "../../components/Step";
import { extractQsParams } from "../../utils";
import { ExchangeCodeForTokenStepInstructions } from "./instructions";

const useAccessTokenExchangeState = reportStepStatus => {
  const [state, setStateBase] = useState({
    stepStatus: null,
    responseBody: null,
    networkError: null,
    showRequestCards: false,
    responseStatusCode: null,
    authCode: extractQsParams().code,
  });

  const setStateWrapper = state => {
    // report the step status to the parent container as it changes
    reportStepStatus(state.stepStatus);
    return setStateBase(state);
  };

  return [state, setStateWrapper];
};

const ExchangeCodeForTokenStep = props => {
  const { reportStepStatus } = props;

  const [state, setState] = useAccessTokenExchangeState(reportStepStatus);

  const stepProps = {
    stepNumber: 4,
    stepStatus: state.stepStatus,
    statusLabel: "Request Access Token",
    stepLabel: "Step 3: Client Back-end Exchanges Auth Code For Access Token",
    flowIcons: {
      source: {
        icon: "backend",
      },
      target: {
        icon: "provider",
      },
    },
    stepInstruction: (
      <ExchangeCodeForTokenStepInstructions state={state} setState={setState} />
    ),
  };

  return <Step {...stepProps} />;
};

export default ExchangeCodeForTokenStep;
