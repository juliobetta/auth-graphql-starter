import gql from 'graphql-tag';

export const getCurrentUser = gql`
  {
    user {
      id
      email
    }
  }
`;

export const logout = gql`
  mutation {
    logout {
      id
      email
    }
  }
`;

export const login = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const signUp = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;
