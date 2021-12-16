import { Errors } from '@gui-nx/types';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InternalError } from '../constants/errors';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/admin/login')
  async adminLogin(@Request() request) {
    try {
      const token = await this.authService.loginAdmin(request.user);

      return { token };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() request) {
    try {
      const token = await this.authService.login(request.user);

      return { token };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }

  @Post('/register')
  async register(@Request() request) {
    try {
      const token = await this.authService.register(request.user);

      return { token };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }
}
