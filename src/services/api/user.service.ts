import apiRoutes from "../../app/API/apiRoutes";
import { AuthResponse } from "../../app/sagas/auth/types";
import { User } from "../../app/types/user";
import { api } from "../../lib/api";

export const signInUser = async (user: Omit<User, "name">) => {
  const res = await api.post(apiRoutes.user.signin, user);
  return res;
};

export const signUpUser = async (user: User) => {
  const res = await api.post<AuthResponse>(apiRoutes.user.signup, user);
  return res;
};
