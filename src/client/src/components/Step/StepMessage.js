import React from "react";
import PropTypes from "prop-types";
import { Message, Divider } from "semantic-ui-react";

const stepMessagePropTypes = {
  header: PropTypes.string,
  extra: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  list: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  ),
};

export const StepMessage = props => {
  const { header, list, extra, ...otherProps } = props;

  return (
    <Message {...otherProps}>
      <Message.Header content={header} />
      <Divider />
      {list && <Message.List items={list} />}
      {extra}
    </Message>
  );
};

export const StepDescription = props => (
  <StepMessage info size="large" {...props} />
);

export const StepInstruction = props => (
  <StepMessage warning size="large" header="Instructions" {...props} />
);

StepMessage.propTypes = stepMessagePropTypes;
StepDescription.propTypes = stepMessagePropTypes;
StepInstruction.propTypes = stepMessagePropTypes;
