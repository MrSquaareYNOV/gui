import { Module } from '@nestjs/common';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Station, StationSchema } from '@gui-nx/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Station.name, schema: StationSchema }])],
  controllers: [StationsController],
  providers: [StationsService]
})
export class StationsModule {
}
