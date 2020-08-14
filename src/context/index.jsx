import React from 'react';
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthProvider } from "./auth-context";
import client from "../apollo";

export const AppProvider = ({ children}) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ApolloProvider>
);
