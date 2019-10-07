import React from "react";
import PropTypes from "prop-types";
import { List, Message, Divider } from "semantic-ui-react";

import { nodeOrElementType, nodeOrElementListType } from "../../utils";

export const StepMessageList = props => {
  const { list, bulleted, headerKey } = props;

  const listProps = bulleted
    ? { bulleted: true }
    : { divided: true, relaxed: "very" };

  return (
    <List {...listProps} style={{ textAlign: "left" }}>
      {list.map((content, index) => (
        <List.Item key={`${headerKey}-${index}`} content={content} />
      ))}
    </List>
  );
};

StepMessageList.propTypes = {
  bulleted: PropTypes.bool,
  headerKey: PropTypes.string.isRequired,
  list: nodeOrElementListType.isRequired,
};

const stepMessagePropTypes = {
  header: PropTypes.string,
  extra: nodeOrElementType,
  list: nodeOrElementListType,
  bulletedList: PropTypes.bool,
};

export const StepMessage = props => {
  const { header, list, bulletedList, extra, ...otherProps } = props;

  return (
    <Message {...otherProps}>
      <Message.Header content={header} />
      <Divider />
      {list && (
        <StepMessageList
          list={list}
          headerKey={header}
          bulleted={bulletedList}
        />
      )}
      {extra}
    </Message>
  );
};

export const StepDescription = props => (
  <StepMessage info size="large" {...props} />
);

export const StepInstruction = props => (
  <StepMessage
    warning
    bulletedList
    size="large"
    header="Instructions"
    {...props}
  />
);

StepMessage.propTypes = stepMessagePropTypes;
StepDescription.propTypes = stepMessagePropTypes;
StepInstruction.propTypes = stepMessagePropTypes;
