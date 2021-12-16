import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Errors, UserDTO } from '@gui-nx/types';
import { toHttpException } from '../exceptions/converter';

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
