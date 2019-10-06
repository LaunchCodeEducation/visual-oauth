export const shapeQsParams = querystring => {
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

const extractQsParams = () => {
  // just the querystring itself, including the leading '?' character
  const querystring = window.location.search;

  // empty object so downstream use isnt broken if no qs is present
  return querystring ? shapeQsParams(querystring) : {};
};

export default extractQsParams;
