import { UserDTO } from '@gui-nx/types';

export class UserRepository {
  private _users: UserDTO[] = [
    {
      id: '0',
      email: 'john.doe@provider.tdl',
      rentalBikeId: '0',
      rentalPosition: '2.0,0.2',
    },
    {
      id: '1',
      email: 'james.doe@provider.tdl',
    },
  ];

  getUser(id: string): UserDTO | undefined {
    return this._users.find((user) => user.id === id);
  }

  getUsers(): UserDTO[] {
    return this._users;
  }
}
