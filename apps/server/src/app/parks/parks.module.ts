import { Module } from '@nestjs/common';
import { ParksController } from './parks.controller';
import { ParksService } from './parks.service';

@Module({
  imports: [],
  controllers: [ParksController],
  providers: [ParksService],
})
export class ParksModule {}
