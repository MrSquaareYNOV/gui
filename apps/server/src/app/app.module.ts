import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BikesModule } from './bikes/bikes.module';
import { ParksModule } from './parks/parks.module';
import { StationsModule } from './stations/stations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, BikesModule, ParksModule, StationsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
