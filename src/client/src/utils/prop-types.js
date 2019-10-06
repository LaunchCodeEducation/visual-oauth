import PropTypes from "prop-types";

export const nodeOrElementType = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.node,
]);

export const nodeOrElementListType = PropTypes.arrayOf(
  nodeOrElementType.isRequired,
);
