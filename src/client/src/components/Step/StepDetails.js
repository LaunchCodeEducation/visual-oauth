import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Segment,
  Accordion,
  AccordionTitle,
  AccordionContent,
  Button,
} from "semantic-ui-react";

const toggleDetails = (detailsVisible, setDetailsVisible) =>
  setDetailsVisible(!detailsVisible);

const StepDetails = props => {
  const { detailsContent } = props;
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <Segment>
      <Accordion>
        <AccordionTitle>
          <Button
            content="View More Details"
            onClick={() => toggleDetails(detailsVisible, setDetailsVisible)}
          />
        </AccordionTitle>
        <AccordionContent active={detailsVisible} content={detailsContent} />
      </Accordion>
    </Segment>
  );
};

StepDetails.propTypes = {
  detailsContent: PropTypes.element.isRequired,
};

export default StepDetails;
