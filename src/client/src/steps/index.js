import React, { useState } from "react";

import Step1 from "./1-AuthenticateAndAuthorize";
import Step2 from "./2-Redirect";
import Step3 from "./3-SendAuthCodeToBackend";
import Step4 from "./4-ExchangeCodeForToken";
import UseAccessToken from "./UseAccessToken";
import { Grid } from "semantic-ui-react";

const VisualOAuth = () => {
  const [oAuthStepsAreComplete, setStepsComplete] = useState(false);

  return (
    <main>
      {/* OAuth Flow Steps */}
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 reportStepStatus={setStepsComplete} />

      {/* display once OAuth Flow is complete */}
      {
        <Grid centered>
          <Grid.Row>
            <iframe
              src="https://giphy.com/embed/3otPoS81loriI9sO8o"
              width="640"
              height="480"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen
            ></iframe>
          </Grid.Row>
        </Grid>
      }

      {/* After OAuth usage */}
      <UseAccessToken />
    </main>
  );
};

export default VisualOAuth;
