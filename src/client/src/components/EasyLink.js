import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

import { nodeOrElementType } from "../utils";

const EasyLink = props => {
  const { url, icon, label, children } = props;

  if (!/^https/.test(url)) {
    console.warn(`An insecure URL has been passed to EasyLink: [${url}]`);
  }

  const child = children || (
    <span>
      {icon && <Icon name={icon} color="blue" />}
      {label && label}
    </span>
  );

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {child}
    </a>
  );
};

EasyLink.propTypes = {
  label: PropTypes.string,
  children: nodeOrElementType,
  url: PropTypes.string.isRequired,
};

export default EasyLink;
