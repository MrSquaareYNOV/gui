import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikesModule } from './bikes/bikes.module';
import { ParksModule } from './parks/parks.module';
import { StationsModule } from './stations/stations.module';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';

const uri = 'mongodb+srv://root:ADISJKAMIN@cluster0.a9czr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

@Module({
  imports: [BikesModule, ParksModule, StationsModule, UsersModule, MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
