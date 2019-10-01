import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Header,
  Divider,
  Segment,
  Message,
  SegmentGroup,
} from "semantic-ui-react";

import StepVisualFlow from "./StepVisualFlow";

const Step = props => {
  const {
    loading,
    stepName,
    flowIcons,
    stepStatus,
    stepDetails,
    stepDescription,
  } = props;

  return (
    <Grid container centered>
      <Divider>
        <Header size="huge" content={stepName} />
      </Divider>

      <Grid.Row>
        <Message info content={stepDescription} />
      </Grid.Row>

      <Grid.Row>
        <SegmentGroup>
          <Segment loading={loading}>
            <StepVisualFlow icons={flowIcons} stepStatus={stepStatus} />
          </Segment>
          <StepDetails detailsContent={stepDetails} />
        </SegmentGroup>
      </Grid.Row>
    </Grid>
  );
};

Step.propTypes = {
  loading: PropTypes.bool,
  stepStatus: PropTypes.bool,
  stepDetails: PropTypes.element,
  stepName: PropTypes.string.isRequired,
  flowIcons: StepVisualFlow.iconsType.isRequired,
  stepDescription: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default Step;
