import { gql } from '@apollo/client';

export const GET_AUTH_USER = gql`
  query getUser {
    AuthUser @client {
      id
      firstName
      lastName
      isAuthenticated
      email
    }
  }
`;

export const GET_TODO = gql`
  query getTodos {
    listAllEntries {
      id
      title
      body
    }
  }
`;
