import { Module } from '@nestjs/common';
import { ParksController } from './parks.controller';
import { ParksService } from './parks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Park, ParkSchema } from '@gui-nx/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Park.name, schema: ParkSchema }])],
  controllers: [ParksController],
  providers: [ParksService]
})
export class ParksModule {
}
