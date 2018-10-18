import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { getCurrentUser } from '../graphql/auth';

class WithSession extends Component {
  static propTypes = {
    requireAuthentication: PropTypes.bool,
    children: PropTypes.func.isRequired
  }

  render() {
    const { requireAuthentication } = this.props;

    return (
      <Query query={getCurrentUser}>
        {({ loading, data }) => {
          if(loading) {
            return null;
          }

          if(requireAuthentication && !data.user) {
            return <Redirect to="/login" />
          }

          if(!requireAuthentication && data.user) {
            return <Redirect to="/dashboard" />
          }

          return this.props.children();
        }}
      </Query>
    );
  }
}

export default WithSession;
