import React from "react";
import { Grid } from "semantic-ui-react";

import OAuthSection from "./OAuth";
import ToolExplanation from "./ToolExplanation";
import AuthenticationAndAuthorization from "./AuthenticationAndAuthorization";

const Introduction = () => {
  return (
    <article>
      <Grid centered>
        <AuthenticationAndAuthorization sectionLabel="Authentication & Authorization" />

        <OAuthSection sectionLabel="OAuth 2.0" />

        <ToolExplanation sectionLabel="How To Use This Tool" />
      </Grid>
    </article>
  );
};

export default Introduction;
