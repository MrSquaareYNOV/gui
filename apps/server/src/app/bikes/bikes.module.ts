import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
import { Bike, BikeSchema } from '@gui-nx/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bike.name, schema: BikeSchema }])],
  controllers: [BikesController],
  providers: [BikesService]
})
export class BikesModule {
}
