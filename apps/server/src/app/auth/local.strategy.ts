import { Errors, UserDTO } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { toHttpException } from '../exceptions/converter';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserDTO> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw toHttpException(
        new Errors([{ code: 'USER_NOT_FOUND', message: 'User not found' }]),
        403
      );
    }

    return user;
  }
}
