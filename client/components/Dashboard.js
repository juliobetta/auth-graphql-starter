import React from 'react';
import WithSession from './WithSession';

const Dashboard = () => (
  <WithSession requireAuthentication>
    {() => (
      <div>You're logged in!!!</div>
    )}
  </WithSession>
);

export default Dashboard;
