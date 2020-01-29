import React from "react";
import { Header, Divider } from "semantic-ui-react";

import stepIcons from "../../components/Step/StepIcon";
import CodeSnippet from "../../components/CodeSnippet";
import BehindTheScenesCode from "../../components/BehindTheScenesCode";

export const RedirectStepCode = () => {
  const description = (
    <span style={{ textAlign: "left" }}>
      The {stepIcons.frontend.inline} extracts the querystring
      <code>code</code> parameter when the redirect page is loaded
    </span>
  );

  const utilityFunctions = `// utility functions (used in Vanilla or React approach)
// these are generic QS utilities that can be used beyond just an OAuth flow

// takes a querystring and turns it into a { key: value, ... } object
// used indirectly through extractQsParams
const shapeQsParams = querystring => {
  // strip the leading '?' character
  // leaving only a param pairs string 'key=value&key2=value2&...'
  const paramPairsString = querystring.replace("?", "");

  // split the param pairs string into an array of individual 'key=value' string pairs
  // then reduce them into an object of { key: value, ... } form
  return paramPairsString.split("&").reduce((paramsObject, paramPairString) => {
    const [key, value] = paramPairString.split("=");

    return { ...paramsObject, [key]: value };
  }, {});
};

// util for extracting the params
const extractQsParams = () => {
  // just the querystring itself, including the leading '?' character
  const querystring = window.location.search;

  // if no qs is present return an empty object
  // so downstream use (expecting an object) isnt broken
  return querystring ? shapeQsParams(querystring) : {};
};
  `;

  const vanillaApproach = `// on this site the trigger for extracting the param is tied to a button click
// in practice it would be tied to the redirect page being loaded / accessed

// this script would ONLY be included in the redirect page HTML
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
  const qsParams = extractQsParams(); // qsParams.code will be the Auth Code

  // logic to submit this code to the Client server (step 3)
});

  `;

  const reactApproach = `class RedirectSuccessView extends React.Component {
  // you may opt for the useEffect() hook if you prefer a more modern approach
  // it is not as intuitive to follow so a class based example is used here instead

  // this lifecycle hook will be executed when the redirect success view is loaded
  // equivalent to the redirect HTML document being loaded in the vanilla approach
  componentDidMount() {
    // as soon as the component mounts check for the code parameter
    const { code } = extractQsParams();

    if (!code) {
      // exit early if the code isnt found
      // logic to update state for redirecting to a login / failure page
    }

    
    // code is present
    // logic to send a request to the Client server (step 3)
  }

  // rest of component / rendering logic
}
  `;

  const snippetContent = (
    <>
      <Divider horizontal section>
        <Header size="small" content="Utility Functions (generic)" />
      </Divider>
      <CodeSnippet language="javascript" snippetString={utilityFunctions} />

      <Divider horizontal section>
        <Header size="small" content="Vanilla JavaScript Implementation" />
      </Divider>
      <CodeSnippet language="javascript" snippetString={vanillaApproach} />

      <Divider horizontal section>
        <Header size="small" content="React Implementation" />
      </Divider>
      <CodeSnippet language="javascript" snippetString={reactApproach} />
    </>
  );

  return (
    <BehindTheScenesCode
      description={description}
      snippetContent={snippetContent}
    />
  );
};
