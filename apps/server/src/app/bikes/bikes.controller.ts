import { APIBike, APIBikes, APIErrors, BikeDTO, Errors } from '@gui-nx/types';
import { BikeDTOValidation } from '@gui-nx/validations';
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
import { BikesService } from './bikes.service';

@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Get()
  findAll(): APIBikes | APIErrors {
    try {
      const bikes = this.bikesService.findAll();

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
  find(@Param('id') id: string): APIBike | APIErrors {
    try {
      const bike = this.bikesService.find(id);

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

  @Post()
  createBike(
    @Body(
      new ValidationPipe({ exceptionFactory: validationPipeExceptionFormatter })
    )
    body: BikeDTOValidation
  ): APIBike | APIErrors {
    try {
      const bike = this.bikesService.createBike(body as Omit<BikeDTO, 'id'>);

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

  @Patch('/:id')
  updateBike(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        exceptionFactory: validationPipeExceptionFormatter,
        skipMissingProperties: true,
      })
    )
    body: BikeDTOValidation
  ): APIBike | APIErrors {
    try {
      const bike = this.bikesService.updateBike(
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

  @Delete('/:id')
  deleteBike(@Param('id') id: string): any | APIErrors {
    try {
      this.bikesService.deleteBike(id);

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
