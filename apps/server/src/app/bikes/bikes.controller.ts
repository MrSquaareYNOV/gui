import {
  APIBike,
  APIBikes,
  APIErrors,
  BikeDTO,
  Errors,
  UserPermission,
} from '@gui-nx/types';
import { BikeDTOValidation } from '@gui-nx/validations';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PermissionGuard } from '../auth/permission.guard';
import { InternalError } from '../constants/errors';
import { validationPipeExceptionFormatter } from '../exceptions/formatter';
import { BikesService } from './bikes.service';

@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Get()
  async findAll(): Promise<APIBikes | APIErrors> {
    try {
      const bikes = await this.bikesService.findAll();

      return { bikes };
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
  async find(@Param('id') id: string): Promise<APIBike | APIErrors> {
    try {
      const bike = await this.bikesService.find(id);

      return { bike };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }

  @UseGuards(AuthGuard('jwt'), new PermissionGuard([UserPermission.ADMIN]))
  @Post()
  async createBike(
    @Body(
      new ValidationPipe({ exceptionFactory: validationPipeExceptionFormatter })
    )
    body: BikeDTOValidation
  ): Promise<APIBike | APIErrors> {
    try {
      const bike = await this.bikesService.createBike(
        body as Omit<BikeDTO, 'id'>
      );

      return { bike };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }

  @UseGuards(AuthGuard('jwt'), new PermissionGuard([UserPermission.ADMIN]))
  @Patch('/:id')
  async updateBike(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        exceptionFactory: validationPipeExceptionFormatter,
        skipMissingProperties: true,
      })
    )
    body: BikeDTOValidation
  ): Promise<APIBike | APIErrors> {
    try {
      const bike = await this.bikesService.updateBike(
        id,
        body as Partial<Omit<BikeDTO, 'id'>>
      );

      return { bike };
    } catch (e) {
      if (e instanceof Errors) {
        return { errors: e.list };
      } else {
        console.error(e);

        return { errors: InternalError.list };
      }
    }
  }

  @UseGuards(AuthGuard('jwt'), new PermissionGuard([UserPermission.ADMIN]))
  @Delete('/:id')
  async deleteBike(@Param('id') id: string): Promise<any | APIErrors> {
    try {
      await this.bikesService.deleteBike(id);

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
