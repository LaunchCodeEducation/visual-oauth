import React from "react";
import PropTypes from "prop-types";
import { Icon, Step } from "semantic-ui-react";

import { stepIconEnum, stepIconProps } from "./StepIcon";

const baseIconProps = {
  size: "massive",
};

const statusProps = {
  null: {
    ...baseIconProps,
    color: "black",
    name: "long arrow alternate right",
  },

  true: {
    ...baseIconProps,
    color: "green",
    name: "check circle",
  },

  false: {
    ...baseIconProps,
    color: "red",
    name: "x",
  },
};

const VisualFlow = props => {
  const { icons, stepStatus } = props;

  const statusIconProps = statusProps[stepStatus];
  const sourceIconProps = stepIconProps[icons.sourceIcon];
  const targetIconProps = stepIconProps[icons.targetIcon];

  return (
    <Step.Group widths={3} fluid>
      <Step>
        <Icon {...sourceIconProps} />
        <Step.Content>
          <Step.Title>{sourceIconProps.label}</Step.Title>
        </Step.Content>
      </Step>

      <Step>
        <Icon {...statusIconProps} />
      </Step>

      <Step>
        <Icon {...targetIconProps} />
        <Step.Content>
          <Step.Title>{targetIconProps.label}</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

const iconsType = PropTypes.objectOf({
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
