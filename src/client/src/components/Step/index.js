import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Divider } from "semantic-ui-react";

import StepVisualFlow from "./StepVisualFlow";
import TogglingContent from "../TogglingContent";
import { nodeOrElementType } from "../../utils";

const Step = props => {
  const {
    stepCode,
    flowIcons,
    stepNumber,
    stepStatus,
    statusLabel,
    stepDescription,
    stepInstruction,
  } = props;

  return (
    <Grid container centered padded>
      <Divider horizontal section>
        <Header size="huge" content={`Step ${stepNumber}`} />
      </Divider>

      <Grid.Row columns={2}>
        <Grid.Column
          width={5}
          verticalAlign="middle"
          children={
            <StepVisualFlow
              icons={flowIcons}
              stepStatus={stepStatus}
              statusLabel={statusLabel}
            />
          }
        />
        <Grid.Column width={11} verticalAlign="middle">
          <Grid.Row>
            <TogglingContent
              buttonLabel="Instructions"
              content={stepInstruction}
            />
          </Grid.Row>
          {stepDescription && (
            <Grid.Row>
              <TogglingContent
                buttonLabel="Description"
                content={stepDescription}
              />
            </Grid.Row>
          )}

          {stepCode && (
            <Grid.Row>
              <TogglingContent buttonLabel="Source" content={stepCode} />
            </Grid.Row>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Step.defaultProps = {
  stepStatus: null,
};

Step.propTypes = {
  stepStatus: PropTypes.bool,
  statusLabel: PropTypes.string.isRequired,
  stepCode: nodeOrElementType.isRequired,
  stepDescription: nodeOrElementType.isRequired,
  stepInstruction: nodeOrElementType.isRequired,
  flowIcons: StepVisualFlow.iconsType.isRequired,
};

export default Step;
