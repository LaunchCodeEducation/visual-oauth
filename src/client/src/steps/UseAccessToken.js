import React, { useState } from "react";

import Step from "../components/Step";
import { StepInstruction } from "../components/Step/StepMessage";
import {
  useUseAccessTokenState,
  buildSetPublicUserData,
  GitHubUserRequestActions,
  buildSetPrivilegedUserData,
} from "../components/GitHubUserRequestActions";

const UseAccessTokenStepInstructions = props => {
  const { setStepStatus } = props;

  const instructions = [
    "Now that the OAuth flow is complete the Access Token can be used",
    "The back-end will normally save the Access Token and associate it with a User account. It will use the Access Token to issue requests as a proxy for the front-end so that the Access Token is never exposed in the browser",
    "Whenever a request is made to the Provider the Access Token is sent through an Authorization header",
    "Enter your GitHub username to request public User data. This data is accessible to anyone on the internet",
    "Next copy the Access Token from the previous step and paste it below to request privileged User data. This data is only accessible by requesters with an Access Token issued to an App with the permission scope [read:user]",
    "You can view the responses below to compare the public and privileged User data",
    "Notice that the privileged User data response has extra information at the end. It contains private information like 'private_gists' and 'private_repo_count' that the Provider does not expose publicly",
  ];

  return (
    <StepInstruction
      list={instructions}
      extra={<GitHubUserRequestActions reportState={setStepStatus} />}
    />
  );
};

const useStepStatus = () => {
  const [stepStatusState, setStepStatusState] = useState(null);

  const setStepStatusFromState = state => {
    const { stepStatus } = state;

    return setStepStatusState(stepStatus);
  };

  return [stepStatusState, setStepStatusFromState];
};

const ExchangeCodeForTokenStep = () => {
  const [stepStatus, setStepStatus] = useStepStatus();

  const stepProps = {
    statusLabel: "Request User Data",
    stepStatus: stepStatus,
    stepLabel: "After OAuth: Use the Access Token",
    flowIcons: {
      source: {
        icon: "backend",
      },
      target: {
        icon: "provider",
      },
    },
    // stepCode: <UseAccessTokenStepCode />,
    // stepDescription: <RedirectStepDescription />,
    stepInstruction: (
      <UseAccessTokenStepInstructions setStepStatus={setStepStatus} />
    ),
  };

  return <Step {...stepProps} />;
};

export default ExchangeCodeForTokenStep;
