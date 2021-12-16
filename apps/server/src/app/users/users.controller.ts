import { APIUser, APIUsers, APIErrors, UserDTO, Errors } from '@gui-nx/types';
import { UserDTOValidation } from '@gui-nx/validations';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { InternalError } from '../constants/errors';
import { validationPipeExceptionFormatter } from '../exceptions/formatter';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<APIUsers | APIErrors> {
    try {
      const users = await this.usersService.findAll();

      return { users };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }

  @Get('/:id')
  find(@Param('id') id: string): APIUser | APIErrors {
    try {
      const user = this.usersService.find(id);

      return { user };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }

  @Post()
  createUser(
    @Body(
      new ValidationPipe({ exceptionFactory: validationPipeExceptionFormatter })
    )
    body: UserDTOValidation
  ): APIUser | APIErrors {
    try {
      const user = this.usersService.createUser(body as Omit<UserDTO, 'id'>);

      return { user };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        exceptionFactory: validationPipeExceptionFormatter,
        skipMissingProperties: true,
      })
    )
    body: UserDTOValidation
  ): APIUser | APIErrors {
    try {
      const user = this.usersService.updateUser(
        id,
        body as Partial<Omit<UserDTO, 'id'>>
      );

      return { user };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): any | APIErrors {
    try {
      this.usersService.deleteUser(id);

      return {};
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
