import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from '../constants/secrets';
import { UserDTO } from '@gui-nx/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: Pick<UserDTO, 'id' | 'email' | 'permission'>) {
    return {
      id: payload.id,
      email: payload.email,
      permission: payload.permission,
    };
  }
}
