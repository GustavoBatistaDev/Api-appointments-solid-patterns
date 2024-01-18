import { User } from "models/authentication/user";

export type ResponseLogin = {
  user: User;
  token: string;
};
