import { setAuthUser, removeAuthUser } from "./auth-mutations";
import { getAuthUser } from "./auth-queries";

export const resolvers = {
  Mutation: {
    setAuthUser,
    removeAuthUser
  },
  Query: {
    getAuthUser
  }
}
