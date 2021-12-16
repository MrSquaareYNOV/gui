import {
  APIStation,
  APIStations,
  APIErrors,
  StationDTO,
  Errors
} from '@gui-nx/types';
import { StationDTOValidation } from '@gui-nx/validations';
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
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {
  }

  @Get()
  async findAll(): Promise<APIStations | APIErrors> {
    try {
      const stations = await this.stationsService.findAll();

      return { stations };
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
  async find(@Param('id') id: string): Promise<APIStation | APIErrors> {
    try {
      const station = await this.stationsService.find(id);

      return { station };
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
  async createStation(
    @Body(
      new ValidationPipe({ exceptionFactory: validationPipeExceptionFormatter })
    )
      body: StationDTOValidation
  ): Promise<APIStation | APIErrors> {
    try {
      const station = await this.stationsService.createStation(
        body as Omit<StationDTO, 'id'>
      );

      return { station };
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
  async updateStation(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        exceptionFactory: validationPipeExceptionFormatter,
        skipMissingProperties: true
      })
    )
      body: StationDTOValidation
  ): Promise<APIStation | APIErrors> {
    try {
      const station = await this.stationsService.updateStation(
        id,
        body as Partial<Omit<StationDTO, 'id'>>
      );

      return { station };
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
  async deleteStation(@Param('id') id: string): Promise<any | APIErrors> {
    try {
      await this.stationsService.deleteStation(id);

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
