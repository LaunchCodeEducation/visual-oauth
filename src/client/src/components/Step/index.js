import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Divider, Segment } from "semantic-ui-react";

import StepVisualFlow from "./StepVisualFlow";
import TogglingContent from "../TogglingContent";

const Step = props => {
  const {
    loading,
    stepName,
    flowIcons,
    stepStatus,
    stepDetails,
    stepDescription,
    stepInstruction,
  } = props;

  return (
    <Grid container centered padded>
      <Divider horizontal section>
        <Header size="huge" content="Step 1" />
      </Divider>

      <Segment loading={loading} style={{ width: "100%" }} padded>
        <Header size="medium" content={stepName} />

        <TogglingContent buttonLabel="Instructions" content={stepInstruction} />

        <StepVisualFlow icons={flowIcons} stepStatus={stepStatus} />

        <TogglingContent buttonLabel="Description">
          {stepDescription}
          <TogglingContent buttonLabel="Details" content={stepDetails} />
        </TogglingContent>
      </Segment>
    </Grid>
  );
};

Step.defaultProps = {
  loading: false,
  stepStatus: null,
};

Step.propTypes = {
  loading: PropTypes.bool,
  stepStatus: PropTypes.bool,
  stepName: PropTypes.string.isRequired,
  flowIcons: StepVisualFlow.iconsType.isRequired,
  stepDetails: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  stepDescription: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  stepInstruction: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default Step;
