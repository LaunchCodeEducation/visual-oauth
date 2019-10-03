import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

export const stepIconEnum = PropTypes.oneOf(["user", "app", "provider"]);

export const stepIconProps = {
  app: {
    name: "server",
    color: "blue",
    label: "App (Server)",
  },

  user: {
    name: "user",
    color: "black",
    label: "User (Browser)",
  },

  provider: {
    name: "server",
    color: "red",
    label: "Provider (Server)",
  },
};

export const stepIcons = (size = "massive") => ({
  app: <Icon {...stepIconProps.app} size={size} />,
  user: <Icon {...stepIconProps.user} size={size} />,
  provider: <Icon {...stepIconProps.provider} size={size} />,
});

export default {
  user: {
    icon: size => stepIcons(size).user,
    props: stepIconProps.user,
    inline: <span>User [ {stepIcons("").user}]</span>,
    inlineCustom: preIconText => (
      <span>
        {preIconText} [ {stepIcons("").user}]
      </span>
    ),
  },

  app: {
    icon: stepIcons.app,
    props: stepIconProps.app,
    inline: <span>App [ {stepIcons("").app}]</span>,
    inlineCustom: preIconText => (
      <span>
        {preIconText} [ {stepIcons("").app}]
      </span>
    ),
  },

  provider: {
    icon: stepIcons.provider,
    props: stepIconProps.provider,
    inline: <span>Provider [ {stepIcons("").provider}]</span>,
    inlineCustom: preIconText => (
      <span>
        {preIconText} [ {stepIcons("").provider}]
      </span>
    ),
  },
};
