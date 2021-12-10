import { UserDTO } from '../types/user';

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

  get users() {
    return this._users;
  }
}
