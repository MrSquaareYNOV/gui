import { APIPark, APIParks, APIErrors, ParkDTO, Errors } from '@gui-nx/types';
import { ParkDTOValidation } from '@gui-nx/validations';
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
import { ParksService } from './parks.service';

@Controller('parks')
export class ParksController {
  constructor(private readonly parksService: ParksService) {}

  @Get()
  findAll(): APIParks | APIErrors {
    try {
      const parks = this.parksService.findAll();

      return { parks };
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
  find(@Param('id') id: string): APIPark | APIErrors {
    try {
      const park = this.parksService.find(id);

      return { park };
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
  createPark(
    @Body(
      new ValidationPipe({ exceptionFactory: validationPipeExceptionFormatter })
    )
    body: ParkDTOValidation
  ): APIPark | APIErrors {
    try {
      const park = this.parksService.createPark(body as Omit<ParkDTO, 'id'>);

      return { park };
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
  updatePark(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        exceptionFactory: validationPipeExceptionFormatter,
        skipMissingProperties: true,
      })
    )
    body: ParkDTOValidation
  ): APIPark | APIErrors {
    try {
      const park = this.parksService.updatePark(
        id,
        body as Partial<Omit<ParkDTO, 'id'>>
      );

      return { park };
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
  deletePark(@Param('id') id: string): any | APIErrors {
    try {
      this.parksService.deletePark(id);

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
