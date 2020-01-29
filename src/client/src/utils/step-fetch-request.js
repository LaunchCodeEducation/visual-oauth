// a fetch wrapper for requests issued during steps
// uses the step's state / setstate automatically
const stepFetchRequest = async ({ endpoint, body, state, setState }) => {
  const tokenEndpoint = `${process.env.REACT_APP_API_DOMAIN}/oauth/${endpoint}`;

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch(() =>
    setState({
      ...state,
      stepStatus: false,
      networkError:
        "Failed to connect to back-end server. Check that the server is running and that it has configured CORS to accept requests from this domain",
    }),
  );

  if (!response) return; // network error

  const responseBody = await response.json();

  return setState({
    ...state,
    responseBody,
    stepStatus: response.ok,
    responseStatusCode: response.status,
  });
};

export default stepFetchRequest;
