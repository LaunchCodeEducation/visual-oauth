import React, { useState } from "react";
import { Grid } from "semantic-ui-react";

import Step1 from "./1-AuthenticateAndAuthorize";
import Step2 from "./2-Redirect";
import Step3 from "./2.5-SendAuthCodeToBackend";
import Step4 from "./3-ExchangeForAccessToken";
import UseAccessToken from "./UseAccessToken";

const VisualOAuth = () => {
  const [oAuthStepsAreComplete, setStepsComplete] = useState(false);

  return (
    <main>
      {/* OAuth Flow Steps */}
      <Step1 />
      <Step2 />
      <Step3 />
      {/* reports back the step status to control display of the gif */}
      <Step4 reportStepStatus={setStepsComplete} />

      {/* display once OAuth Flow is complete */}
      {oAuthStepsAreComplete && (
        <Grid centered>
          <Grid.Row>
            <iframe
              width="640"
              height="480"
              title="elf-gif"
              frameBorder="0"
              allowFullScreen
              className="giphy-embed"
              src="https://giphy.com/embed/3otPoS81loriI9sO8o"
            ></iframe>
          </Grid.Row>
        </Grid>
      )}

      {/* After OAuth usage */}
      <UseAccessToken />
    </main>
  );
};

export default VisualOAuth;
