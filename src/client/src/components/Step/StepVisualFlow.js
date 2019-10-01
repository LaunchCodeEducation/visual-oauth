import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

const baseIconProps = {
  size: "massive",
};

const iconProps = {
  app: {
    ...baseIconProps,
    name: "server",
    color: "blue",
    label: "App Server",
  },

  user: {
    ...baseIconProps,
    name: "user",
    color: "black",
    label: "User",
  },

  provider: {
    ...baseIconProps,
    name: "server",
    color: "red",
    label: "Provider Server",
  },
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
    name: "check circle outline",
  },

  false: {
    ...baseIconProps,
    color: "red",
    name: "x",
    bordered: true,
  },
};

const VisualFlow = props => {
  const { sourceIcon, targetIcon, stepStatus } = props.icons;

  const sourceIconProps = iconProps[sourceIcon];
  const targetIconProps = iconProps[targetIcon];
  const statusIconProps = statusProps[stepStatus];

  return (
    <Step.Group widths={3}>
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

const iconEnumType = PropTypes.oneOf(["user", "app", "provider"]);

const iconsType = PropTypes.objectOf({
  sourceIcon: iconEnumType.isRequired,
  targetIcon: iconEnumType.isRequired,
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
