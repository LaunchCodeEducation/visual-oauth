import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Divider } from "semantic-ui-react";

import StepVisualFlow from "./StepVisualFlow";
import TogglingContent from "../TogglingContent";
import { nodeOrElementType } from "../../utils";

const Step = props => {
  const {
    stepNumber,
    flowIcons,
    stepStatus,
    statusLabel,
    stepDetails,
    stepDescription,
    stepInstruction,
  } = props;

  return (
    <Grid container centered padded>
      <Divider horizontal section>
        <Header size="huge" content={`Step ${stepNumber}`} />
      </Divider>

      <Grid.Row columns={3}>
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
          <TogglingContent buttonLabel="Description">
            {stepDescription}
            <TogglingContent buttonLabel="Details" content={stepDetails} />
          </TogglingContent>
          <TogglingContent
            buttonLabel="Instructions"
            content={stepInstruction}
          />
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
  stepDetails: nodeOrElementType.isRequired,
  stepDescription: nodeOrElementType.isRequired,
  stepInstruction: nodeOrElementType.isRequired,
  flowIcons: StepVisualFlow.iconsType.isRequired,
};

export default Step;
