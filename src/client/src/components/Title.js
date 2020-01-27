import React from "react";
import { Grid, Segment, Divider, Header } from "semantic-ui-react";

import EasyLink from "./EasyLink";

const Title = () => {
  return (
    <Grid centered container padded>
      <Header size="huge" textAlign="center" content="Visual OAuth" />

      <Segment compact raised textAlign="center" attached="top">
        <p>
          An interactive and{" "}
          <EasyLink
            icon="github"
            label="open source"
            url="https://github.com/LaunchCodeEducation/visual-oauth"
          />{" "}
          learning tool by{" "}
          <EasyLink
            label="Paul"
            icon="github"
            url="https://github.com/pdmxdd"
          />{" "}
          and{" "}
          <EasyLink
            label="Vamp"
            icon="github"
            url="https://github.com/the-vampiire"
          />{" "}
          from{" "}
          <EasyLink
            icon="rocket"
            url="https://launchcode.org"
            label="The LaunchCode Foundation"
          />
        </p>
      </Segment>

      <Segment compact raised textAlign="left" attached="bottom">
        <p>
          Visual OAuth uses progressive disclosure to help you learn at your own
          pace. Instead of being inundated with information you choose when you
          are ready to absorb more details. Start learning on the surface before
          expanding sections for more information when you are ready to dig
          deeper.
          {/* </p>

          <p> */} You are encouraged to{" "}
          <EasyLink
            icon="github"
            label="clone the repo"
            url="https://github.com/LaunchCodeEducation/visual-oauth"
          />{" "}
          and run Visual OAuth locally to explore and modify the source code.
          The best way to learn more is to get your hands dirty with some
          tinkering! Step-by-step instructions for running locally are included
          in the repo and advice on tinkering can be found in the{" "}
          <EasyLink
            icon="github"
            label="TINKER.md file"
            url="https://github.com/LaunchCodeEducation/visual-oauth/blob/master/TINKER.md"
          />
          .
        </p>
      </Segment>
      <Divider horizontal />
    </Grid>
  );
};

export default Title;
