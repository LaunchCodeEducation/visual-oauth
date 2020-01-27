import React from "react";
import { Grid, Divider, Header } from "semantic-ui-react";

import OAuthSection from "./OAuth";
import BackgroundSection from "./Background";
import ToolExplanation from "./ToolExplanation";

const Introduction = () => {
  return (
    <article>
      <Grid centered>
        <BackgroundSection sectionLabel="Background Information" />

        <OAuthSection sectionLabel="OAuth Information" />

        <ToolExplanation sectionLabel="How To Use This Tool" />
      </Grid>
    </article>
  );
};

export default Introduction;
