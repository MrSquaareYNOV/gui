import { Module } from '@nestjs/common';
import { ParksController } from './parks.controller';
import { ParksService } from './parks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bike, BikeSchema } from '@gui-nx/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bike.name, schema: BikeSchema }])],
  controllers: [ParksController],
  providers: [ParksService],
})
export class ParksModule {}
