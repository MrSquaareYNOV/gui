import { Module } from '@nestjs/common';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';

@Module({
  imports: [],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
