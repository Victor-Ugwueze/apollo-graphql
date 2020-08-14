import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const SET_AUTH_USER = gql`
  mutation setAuthUser($user: AuthUser!, $token: String!) {
    setAuthUser(user: $user, token: $token) @client
  }
`;
