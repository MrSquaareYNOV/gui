import { Bike, BikeSchema } from '@gui-nx/schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from '../auth/jwt.strategy';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bike.name, schema: BikeSchema }]),
    JwtStrategy,
  ],
  controllers: [BikesController],
  providers: [BikesService],
})
export class BikesModule {}
