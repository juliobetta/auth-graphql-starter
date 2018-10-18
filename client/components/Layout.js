import React, { Fragment, Component } from 'react';
import { Route } from 'react-router';
import Header from './Header';
import WithSession from './WithSession';

export default class extends Component {
  render() {
    const {
      component: WrappedComponent,
      requiresAuthentication = false,
      ...rest
    } = this.props;

    return (
      <WithSession requiresAuthentication={!!requiresAuthentication}>
        {() => (
          <Route
            {...rest}
            render={this.renderComponent(WrappedComponent)}
          />
        )}
      </WithSession>
    );
  }

  /**
   * Render the composed component
   * @param {React.Component} WrappedComponent
   * @return {function(matchProps): React.Component} the router matched props
   */
  renderComponent = WrappedComponent => matchProps => (
    <Fragment>
      <Header />

      <div className="container">
        <WrappedComponent {...matchProps} location={this.props.location} />
      </div>
    </Fragment>
  );
};
