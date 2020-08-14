import { initialData } from '../cache';
import { GET_AUTH_USER } from '../queries';

export const setAuthUser = (_, variables, { cache }) => {
  const { AuthUser } = cache.readQuery({
    query: GET_AUTH_USER,
  });

  console.log(AuthUser, 'AuthUser');
  const data = {
    AuthUser: {
      ...AuthUser,
      ...variables.user,
      isAuthenticated: true,
    },
  };
  localStorage.setItem('token', variables.token);
  localStorage.setItem('user', JSON.stringify(variables.user));
  cache.writeData({ data });
  return data;
};

export const removeAuthUser = (_root, _, { cache }) => {
  const data = {
    AuthUser: initialData,
  };
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  cache.writeData({ data });
  return data;
};
