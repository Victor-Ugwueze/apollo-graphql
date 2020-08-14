import { GET_AUTH_USER } from "../queries";

export const getAuthUser = (_root, _, cache) => {
  const data = cache.readQuery({
    query: GET_AUTH_USER
  });
  return data;
};
