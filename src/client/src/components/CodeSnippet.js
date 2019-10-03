import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/esm/styles/hljs/github-gist";

const CodeSnippet = props => {
  const { language, snippetString } = props;
  return (
    <div style={{ textAlign: "left" }}>
      <SyntaxHighlighter style={theme} wrapLines={true} language={language}>
        {snippetString}
      </SyntaxHighlighter>
    </div>
  );
};

CodeSnippet.defaultProps = {
  language: "javascript",
};

CodeSnippet.propTypes = {
  snippetString: PropTypes.string,
  language: PropTypes.oneOf(["html", "javascript"]).isRequired,
};

export default CodeSnippet;
