import { UserDTO } from '../user';

export type APIUsers = {
  users: UserDTO[];
};

export type APIUser = {
  user: UserDTO;
};
