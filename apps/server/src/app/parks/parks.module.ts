import { Park, ParkSchema } from '@gui-nx/schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ParksController } from './parks.controller';
import { ParksService } from './parks.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Park.name, schema: ParkSchema }])],
  controllers: [ParksController],
  providers: [ParksService]
})
export class ParksModule {
}
