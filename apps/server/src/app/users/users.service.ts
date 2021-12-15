import { UserDTO, Errors } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  private _users: UserDTO[] = [];

  findAll(): UserDTO[] {
    return this._users;
  }

  find(id: string): UserDTO | undefined {
    const user = this._users.find((user) => user.id === id);

    if (!user) {
      throw new Errors([{ code: 'USER_NOT_FOUND', message: 'User not found' }]);
    }

    return { ...user };
  }

  createUser(user: Omit<UserDTO, 'id'>): UserDTO {
    const newUser = {
      ...user,
      id: v4(),
    };

    this._users.push(newUser);

    return newUser;
  }

  updateUser(
    id: string,
    user: Partial<Omit<UserDTO, 'id'>>
  ): UserDTO | undefined {
    const userIdx = this._users.findIndex((item) => item.id === id);

    if (userIdx === -1) {
      throw new Errors([{ code: 'USER_NOT_FOUND', message: 'User not found' }]);
    }

    const editedUser = {
      ...this._users[userIdx],
      ...user,
      id: id,
    };

    this._users.splice(userIdx, 1, editedUser);

    return editedUser;
  }

  deleteUser(id: string): void {
    const userIdx = this._users.findIndex((item) => item.id === id);

    if (userIdx === -1) {
      throw new Errors([{ code: 'USER_NOT_FOUND', message: 'User not found' }]);
    }

    this._users.splice(userIdx, 1);
  }
}
