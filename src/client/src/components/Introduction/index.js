import React from "react";

import OAuthSection from "./OAuth";
import BackgroundSection from "./Background";

const Introduction = () => {
  return (
    <article>
      <BackgroundSection />
      <OAuthSection />
    </article>
  );
};

export default Introduction;
