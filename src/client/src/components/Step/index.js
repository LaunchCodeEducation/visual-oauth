import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Divider } from "semantic-ui-react";

import StepVisualFlow from "./StepVisualFlow";
import TogglingContent from "../TogglingContent";
import { nodeOrElementType } from "../../utils";

const Step = props => {
  const {
    // TODO: uncomment when all steps have these sections completed
    // stepCode,
    // stepDescription,
    flowIcons,
    stepLabel,
    stepStatus,
    statusLabel,
    stepInstruction,
  } = props;

  return (
    <Grid container centered padded>
      <Divider horizontal section>
        <Header size="huge" content={stepLabel} />
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
          {/* TODO: uncomment when all sections have step description */}
          {/* {stepDescription && (
            <Grid.Row>
              <TogglingContent
                buttonLabel="Description"
                content={stepDescription}
              />
            </Grid.Row>
          )} */}

          {/* TODO: uncomment when all sections have source code */}
          {/* {stepCode && (
            <Grid.Row>
              <TogglingContent buttonLabel="Source" content={stepCode} />
            </Grid.Row>
          )} */}
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
  stepLabel: PropTypes.string.isRequired,
  statusLabel: PropTypes.string.isRequired,
  stepInstruction: nodeOrElementType.isRequired,
  flowIcons: StepVisualFlow.iconsType.isRequired,
  // TODO: uncomment when all steps have these sections completed
  // stepCode: nodeOrElementType.isRequired,
  // stepDescription: nodeOrElementType.isRequired,
};

export default Step;
