import React from "react";
import PropTypes from "prop-types";
import { Icon, Step } from "semantic-ui-react";

import { stepIconEnum, stepIconProps } from "./StepIcon";

const VisualFlow = props => {
  const { icons, stepStatus, statusLabel } = props;
  const { source, target } = icons;

  const sourceIconProps = stepIconProps[source.icon];
  const targetIconProps = stepIconProps[target.icon];
  const statusIconProps = stepIconProps.status[stepStatus];

  return (
    <Step.Group vertical>
      <Step>
        <Icon {...sourceIconProps} />
        <Step.Content title={sourceIconProps.label} />
      </Step>

      <Step active={stepStatus}>
        <Icon {...statusIconProps} />
        <Step.Content title={statusLabel} />
      </Step>

      <Step>
        <Icon {...targetIconProps} />
        <Step.Content title={targetIconProps.label} />
      </Step>
    </Step.Group>
  );
};

const iconsType = PropTypes.shape({
  sourceIcon: stepIconEnum.isRequired,
  targetIcon: stepIconEnum.isRequired,
});

VisualFlow.propTypes = {
  stepStatus: PropTypes.bool,
  icons: iconsType.isRequired,
};

VisualFlow.defaultProps = {
  stepStatus: null,
};

VisualFlow.iconsType = iconsType;
export default VisualFlow;
