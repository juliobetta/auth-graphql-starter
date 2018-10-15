import React, { Component } from 'react';
import { get } from 'lodash';
import { Mutation } from 'react-apollo';
import { signUp, getCurrentUser, login } from '../graphql/auth';

class Form extends Component {
  state = {
    email: '',
    password: ''
  };

  render() {
    const { mutation, title } = this.getProps();
    const { email, password } = this.state;

    return (
      <Mutation mutation={mutation} refetchQueries={[{ query: getCurrentUser }]}>
        {fn => (
          <div className="row">
            <h3>{title}</h3>

            <form onSubmit={this.onSubmit(fn)} className="col s6">
              <div className="input-field">
                <label>Email</label>
                <input type="email" onChange={this.onChangeField('email')} value={email} />
              </div>

              <div className="input-field">
                <label>Password</label>
                <input type="password" onChange={this.onChangeField('password')} value={password}/>
              </div>

              <button className="btn">SUBMIT</button>
            </form>
          </div>
        )}
      </Mutation>
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
    }).then(() => this.props.history.replace('/'));
  }

  onChangeField = field => event => this.setState({ [field]: event.target.value });
}

export default Form;
