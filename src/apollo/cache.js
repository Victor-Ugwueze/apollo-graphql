import { InMemoryCache } from 'apollo-cache-inmemory';
import decodeJWT from 'jwt-decode';

const getUserFromToken = () => {
  const { token } = localStorage;
  const data = {
    isAuthenticated: false,
  };

  if (token) {
    const decodedToken = decodeJWT(token);

    const { exp, ...user } = decodedToken;
    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      localStorage.removeItem('token');
      return data;
    }
    const localUserData = JSON.parse(localStorage.getItem('user'));
    return {
      ...data,
      ...user,
      ...localUserData,
      isAuthenticated: true,
    };
  }

  return data;
};

export const initialData = {
  AuthUser: {
    id: '',
    email: '',
    lastName: '',
    firstName: '',
    isAuthenticated: false,
    ...getUserFromToken(),
    __typename: 'AuthUser',
  },
};

export const cache = new InMemoryCache();

cache.writeData({ data: { ...initialData } });
