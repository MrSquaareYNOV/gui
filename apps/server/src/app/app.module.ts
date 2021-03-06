import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BikesModule } from './bikes/bikes.module';
import { ParksModule } from './parks/parks.module';
import { StationsModule } from './stations/stations.module';
import { UsersModule } from './users/users.module';

const uri =
  'mongodb+srv://root:ADISJKAMIN@cluster0.a9czr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

@Module({
  imports: [
    AuthModule,
    BikesModule,
    ParksModule,
    StationsModule,
    UsersModule,
    MongooseModule.forRoot(uri),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
