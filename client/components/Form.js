import React, { Component } from 'react';
import { get } from 'lodash';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { signUp, getCurrentUser, login } from '../graphql/auth';
import WithSession from './WithSession';

class Form extends Component {
  state = {
    email: '',
    password: '',
    errors: []
  };

  render() {
    const { mutation, title } = this.getProps();
    const { email, password } = this.state;

    return (
      <WithSession requireAuthentication={false}>
        {() => (
          <Mutation mutation={mutation} update={this.onMutationSuccess}>
            {fn => (
              <div className="row">
                <h3>{title}</h3>

                <form onSubmit={this.onSubmit(fn)} className="col s6">
                  <div className="input-field">
                    <input
                      placeholder="Email"
                      type="email"
                      onChange={this.onChangeField('email')}
                      value={email}
                    />
                  </div>

                  <div className="input-field">
                    <input
                      placeholder="Password"
                      type="password"
                      onChange={this.onChangeField('password')}
                      value={password}
                    />
                  </div>

                  <div className="errors">
                    {this.state.errors.map(error => <div key={error}>{error}</div>)}
                  </div>

                  <button className="btn">SUBMIT</button>
                </form>
              </div>
            )}
          </Mutation>
        )}
      </WithSession>
    );
  }

  getProps() {
    return {
      '/signup': {
        mutation: signUp,
        title: 'Sign Up'
      },
      '/login': {
        mutation: login,
        title: 'Log In'
      }
    }[this.props.match.path];
  }

  onSubmit = mutation => event => {
    event.preventDefault();

    const { email, password } = this.state;

    return mutation({
      variables: { email, password }
    })
      .then(() => this.props.history.replace('/'))
      .catch(response =>
        this.setState({ errors: response.graphQLErrors.map(error => error.message) })
      );
  }

  onMutationSuccess = (cache, { data }) => {
    cache.writeQuery({
      query: getCurrentUser,
      data: { user: Object.values(data)[0] }
    });
  }

  onChangeField = field => event => this.setState({ [field]: event.target.value });
}

export default Form;
