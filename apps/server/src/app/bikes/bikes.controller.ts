import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { BikesService } from './bikes.service';

@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {
  }

  @Get()
  findAll(): string {
    return this.bikesService.findAll();
  }

  @Post()
  addBike(): string {
    return this.bikesService.addBike();
  }

  @Get('/:bikeId')
  find(): string {
    return this.bikesService.find();
  }

  @Patch('/:bikeId')
  updateBike(): string {
    return this.bikesService.updateBike();
  }

  @Delete('/:bikeId')
  deleteBike(): string {
    return this.bikesService.deleteBike();
  }

  @Post('/:bikeId/rent')
  rent(): string {
    return this.bikesService.rent();
  }

  @Post('/:bikeId/return')
  goBack(): string {
    return this.bikesService.goBack();
  }

}
