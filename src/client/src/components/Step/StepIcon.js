import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

export const stepIconEnum = PropTypes.oneOf([
  "frontend",
  "backend",
  "provider",
]);

const sharedIconProps = {
  // any shared props go here
};

export const stepIconProps = {
  backend: {
    ...sharedIconProps,
    name: "server",
    color: "blue",
    label: "App Back-end (Server)",
  },

  frontend: {
    ...sharedIconProps,
    name: "user",
    color: "black",
    label: "App Front-end (Browser)",
  },

  provider: {
    ...sharedIconProps,
    name: "server",
    color: "red",
    label: "Provider (Server)",
  },

  status: {
    null: {
      ...sharedIconProps,
      color: "black",
      name: "long arrow alternate down",
    },

    true: {
      ...sharedIconProps,
      color: "green",
      name: "check circle",
    },

    false: {
      ...sharedIconProps,
      color: "red",
      name: "x",
    },
  },
};

// !! change visual flow icon size here
export const stepIcons = (size = "small", fitted = false) => ({
  backend: <Icon {...stepIconProps.backend} size={size} fitted={fitted} />,
  frontend: <Icon {...stepIconProps.frontend} size={size} fitted={fitted} />,
  provider: <Icon {...stepIconProps.provider} size={size} fitted={fitted} />,
});

// !! change inline icon size here
const inlineIcons = ((size = "small") => {
  // inline icons have "fitted" prop true (no spaces on either side of icon)
  const inlineStepIcons = stepIcons(size, true);

  return Object.entries(stepIconProps).reduce((inlineIcons, iconPropsEntry) => {
    const [iconName, iconProps] = iconPropsEntry;

    // exit early to ignore status icon props (no label)
    if (!iconProps.label) return inlineIcons;

    // split label to extract short name
    const [shortName] = iconProps.label.split(" ");

    // get stepIcon at inline size
    const inlineStepIcon = inlineStepIcons[iconName];

    return {
      ...inlineIcons,
      [iconName]: {
        inline: (
          <span>
            {shortName} [{inlineStepIcon}]
          </span>
        ),
        inlineCustom: preIconText => (
          <span>
            {preIconText} [{inlineStepIcon}]
          </span>
        ),
      },
    };
  }, {});
})();

export default {
  frontend: {
    ...inlineIcons.frontend,
    icon: stepIcons().frontend,
    props: stepIconProps.frontend,
  },

  backend: {
    ...inlineIcons.backend,
    icon: stepIcons().backend,
    props: stepIconProps.backend,
  },

  provider: {
    ...inlineIcons.provider,
    icon: stepIcons().provider,
    props: stepIconProps.provider,
  },
};
