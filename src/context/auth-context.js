import React, { createContext, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SET_AUTH_USER } from '../apollo/mutations/auth';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTH_USER } from '../apollo/queries';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const { data } = useQuery(GET_AUTH_USER);
  const [setCurrentUser] = useMutation(SET_AUTH_USER);

  return (
    <AuthContext.Provider
      value={{
        user: data.AuthUser,
        setCurrentUser
      }}
      {...props}
    />
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
