import React, { useState } from "react";
import PropTypes from "prop-types";
import { Accordion, Grid, Button } from "semantic-ui-react";

import { nodeOrElementType } from "../utils";

const TogglingContent = props => {
  const {
    trigger,
    content,
    children,
    buttonLabel,
    buttonSize,
    defaultVisibility,
  } = props;
  const [contentVisible, setContentVisibility] = useState(defaultVisibility);

  return (
    <Grid centered container padded>
      <Accordion>
        {trigger ? (
          <Accordion.Title
            onClick={() => setContentVisibility(!contentVisible)}
          >
            {trigger}
          </Accordion.Title>
        ) : (
          <Accordion.Title>
            <Button
              basic
              color="blue"
              size={buttonSize}
              onClick={() => setContentVisibility(!contentVisible)}
              content={`${contentVisible ? "Hide " : "View "} ${buttonLabel}`}
            />
          </Accordion.Title>
        )}
        <Accordion.Content
          active={contentVisible}
          content={content || children}
        />
      </Accordion>
    </Grid>
  );
};

TogglingContent.defaultProps = {
  buttonSize: "huge",
  defaultVisibility: false,
};

TogglingContent.propTypes = {
  trigger: PropTypes.element,
  content: nodeOrElementType,
  children: nodeOrElementType,
  buttonLabel: PropTypes.string,
  defaultVisibility: PropTypes.bool,
  buttonSize: PropTypes.oneOf(["small", "medium", "large", "huge", "massive"]),
};

export default TogglingContent;
