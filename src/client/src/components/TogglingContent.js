import React, { useState } from "react";
import PropTypes from "prop-types";
import { Accordion, Grid, Button } from "semantic-ui-react";

const TogglingContent = props => {
  const { buttonLabel, trigger, content, children } = props;
  const [contentVisible, setContentVisibility] = useState(false);

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
              onClick={() => setContentVisibility(!contentVisible)}
              content={`${contentVisible ? "Hide " : "Show "} ${buttonLabel}`}
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

TogglingContent.propTypes = {};

export default TogglingContent;
