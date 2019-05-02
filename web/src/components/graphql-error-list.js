import React from 'react';

// eslint-disable-next-line react/prop-types
const GraphQLErrorList = ({ errors }) => (
  <div>
    <h1>GraphQL Error</h1>
    {errors.map(error => (
      <pre key={error.message}>{error.message}</pre>
    ))}
  </div>
);

export default GraphQLErrorList;
