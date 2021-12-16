import { StationDTO, Errors } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Station, StationDocument } from '@gui-nx/schema';
import { Model } from 'mongoose';

@Injectable()
export class StationsService {
  constructor(@InjectModel(Station.name) private stationModel: Model<StationDocument>) {
  }

  //private _stations: StationDTO[] = [];

  async findAll(): Promise<Station[]> {
    return await this.stationModel.find().exec();
  }

  async find(id: string): Promise<Station | undefined> {
    const station = await this.stationModel.findById(id).exec();

    if (!station) {
      throw new Errors([
        { code: 'STATION_NOT_FOUND', message: 'Station not found' }
      ]);
    }

    return { ...station };
  }

  async createStation(station: Omit<StationDTO, 'id'>): Promise<Station> {
    const createdStation = await new this.stationModel({ ...station, id: v4() });
    return createdStation.save();
  }

  async updateStation(
    id: string,
    station: Partial<Omit<StationDTO, 'id'>>
  ): Promise<Station | undefined> {
    return await this.stationModel.findByIdAndUpdate(id, station).exec();
  }

  async deleteStation(id: string): Promise<void> {
    await this.stationModel.findByIdAndDelete(id).exec();
  }
}
