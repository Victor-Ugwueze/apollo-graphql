import { gql } from "@apollo/client";

export const typeDefs = gql`
  type AuthUser {
    id: ID
    email: String
    firstname: String
    lastname: String
    image: String
    phone: String
  }


  type Mutation  {
    setAuthUser(user: AuthUser! token: String!): AuthUser!
  }

  type Query {
    getAuthUser: AuthUser!
  }
`;
