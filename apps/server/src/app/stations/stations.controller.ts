import {
  APIStation,
  APIStations,
  APIErrors,
  StationDTO,
  Errors,
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
  ValidationPipe,
} from '@nestjs/common';
import { InternalError } from '../constants/errors';
import { validationPipeExceptionFormatter } from '../exceptions/formatter';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  findAll(): APIStations | APIErrors {
    try {
      const stations = this.stationsService.findAll();

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
  find(@Param('id') id: string): APIStation | APIErrors {
    try {
      const station = this.stationsService.find(id);

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
  createStation(
    @Body(
      new ValidationPipe({ exceptionFactory: validationPipeExceptionFormatter })
    )
    body: StationDTOValidation
  ): APIStation | APIErrors {
    try {
      const station = this.stationsService.createStation(
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
  updateStation(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        exceptionFactory: validationPipeExceptionFormatter,
        skipMissingProperties: true,
      })
    )
    body: StationDTOValidation
  ): APIStation | APIErrors {
    try {
      const station = this.stationsService.updateStation(
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
  deleteStation(@Param('id') id: string): any | APIErrors {
    try {
      this.stationsService.deleteStation(id);

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
