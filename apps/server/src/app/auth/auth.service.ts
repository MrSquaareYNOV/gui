import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPermission, UserDTO, Errors } from '@gui-nx/types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(user: Omit<UserDTO, 'id' | 'permission'>): Promise<string> {
    const newUser = await this.usersService.createUser({
      ...user,
      permission: UserPermission.USER,
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      permission: newUser.permission,
    };

    return this.jwtService.sign(payload);
  }

  async loginAdmin(user: UserDTO): Promise<string> {
    if (user.permission !== UserPermission.ADMIN) {
      throw new Errors([
        { code: 'INVALID_PERMISSION', message: 'Invalid permission' },
      ]);
    }

    const payload = {
      id: user.id,
      email: user.email,
      permission: user.permission,
    };

    return this.jwtService.sign(payload);
  }

  async login(user: UserDTO): Promise<string> {
    if (user.permission !== UserPermission.USER) {
      throw new Errors([
        { code: 'INVALID_PERMISSION', message: 'Invalid permission' },
      ]);
    }

    const payload = {
      id: user.id,
      email: user.email,
      permission: user.permission,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<UserDTO | undefined> {
    try {
      const user = await this.usersService.findByEmail(email);

      if (user.password === password) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userData } = user;

        return userData;
      }

      return null;
    } catch (e) {
      return null;
    }
  }
}
