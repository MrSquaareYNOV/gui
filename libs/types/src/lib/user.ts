export const enum UserPermission {
  USER = 0,
  ADMIN = 1,
}

export type UserDTO = {
  id: string;
  email: string;
  password?: string;
  rentalBikeId?: string;
  rentalPosition?: string;
  permission: UserPermission;
};
