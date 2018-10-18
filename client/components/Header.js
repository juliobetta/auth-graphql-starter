import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { getCurrentUser, logout as logoutMutation } from '../graphql/auth';


class Header extends Component {
  render() {
    return (
      <Query query={getCurrentUser}>
        {({ loading, data }) => (
          <nav>
            <div className="nav-wrapper container">
              <Link to="/" className="brand-logo left">Home</Link>

              <ul className="right">
                {this.renderButtons({ loading, data })}
              </ul>
            </div>
          </nav>
        )}
      </Query>
    );
  }

  renderButtons({ loading, data }) {
    const { user } = data;

    if(loading) {
      return null;
    }

    if(user) {
      return (
        <li>
          <Mutation mutation={logoutMutation} refetchQueries={[{ query: getCurrentUser }]}>
            {logout =>
              <Link to="/" onClick={this.onClickLogout(logout)}>Log Out</Link>
            }
          </Mutation>
        </li>
      )
    }

    return (
      <Fragment>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </Fragment>
    );
  }

  onClickLogout = logout => event => {
    event.preventDefault();

    return logout();
  }
}

export default Header;
