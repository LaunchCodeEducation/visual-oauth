import React, { useState } from "react";

import { extractQsParams } from "../../utils";

import Step from "../../components/Step";
import { SendAuthCodeStepDescription } from "./description";
import { SendAuthCodeStepInstructions } from "./instructions";

const SendAuthCodeToBackendStep = () => {
  const [state, setState] = useState({
    stepStatus: null,
    responseBody: null,
    networkError: null,
    showRequestCards: false,
    responseStatusCode: null,
    authCode: extractQsParams().code,
  });

  const stepProps = {
    statusLabel: "Send Auth Code",
    stepStatus: state.stepStatus,
    stepLabel: "Step 2.5*: Client Front-end Sends Auth Code to Back-end",
    flowIcons: {
      source: {
        icon: "frontend",
      },
      target: {
        icon: "backend",
      },
    },
    stepDescription: <SendAuthCodeStepDescription />,
    stepInstruction: (
      <SendAuthCodeStepInstructions state={state} setState={setState} />
    ),
  };

  return <Step {...stepProps} />;
};

export default SendAuthCodeToBackendStep;
