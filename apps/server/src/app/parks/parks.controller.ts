import { APIErrors, APIPark, APIParks, Errors,ParkDTO } from '@gui-nx/types';
import { ParkDTOValidation } from '@gui-nx/validations';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe
} from '@nestjs/common';

import { InternalError } from '../constants/errors';
import { validationPipeExceptionFormatter } from '../exceptions/formatter';
import { ParksService } from './parks.service';

@Controller('parks')
export class ParksController {
  constructor(private readonly parksService: ParksService) {
  }

  @Get()
  async findAll(): Promise<APIParks | APIErrors> {
    try {
      const parks = await this.parksService.findAll();

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
  async find(@Param('id') id: string): Promise<APIPark | APIErrors> {
    try {
      const park = await this.parksService.find(id);

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
  async createPark(
    @Body(
      new ValidationPipe({ exceptionFactory: validationPipeExceptionFormatter })
    )
      body: ParkDTOValidation
  ): Promise<APIPark | APIErrors> {
    try {
      const park = await this.parksService.createPark(body as Omit<ParkDTO, 'id'>);

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
  async updatePark(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        exceptionFactory: validationPipeExceptionFormatter,
        skipMissingProperties: true
      })
    )
      body: ParkDTOValidation
  ): Promise<APIPark | APIErrors> {
    try {
      const park = await this.parksService.updatePark(
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
  async deletePark(@Param('id') id: string): Promise<any | APIErrors> {
    try {
      await this.parksService.deletePark(id);

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
