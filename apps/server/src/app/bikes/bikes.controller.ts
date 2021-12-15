import { APIBike, APIBikes, APIErrors, Errors } from '@gui-nx/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InternalError } from '../constants/errors';
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
  createBike(@Body() body): APIBike | APIErrors {
    try {
      const bike = this.bikesService.createBike(body);

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
  updateBike(@Param('id') id: string, @Body() body): APIBike | APIErrors {
    try {
      const bike = this.bikesService.updateBike(id, body);

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
