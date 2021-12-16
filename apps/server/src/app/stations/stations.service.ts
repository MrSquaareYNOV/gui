import { Station, StationDocument } from '@gui-nx/schema';
import { Errors, StationDTO } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';

@Injectable()
export class StationsService {
  constructor(
    @InjectModel(Station.name) private stationModel: Model<StationDocument>
  ) {}

  async findAll(): Promise<Station[]> {
    return await this.stationModel.find().exec();
  }

  async find(id: string): Promise<Station | undefined> {
    const station = (await this.stationModel.find({ id }).exec())[0];

    if (!station) {
      throw new Errors([
        { code: 'STATION_NOT_FOUND', message: 'Station not found' },
      ]);
    }

    return { ...station.toObject() };
  }

  async createStation(station: Omit<StationDTO, 'id'>): Promise<Station> {
    return await new this.stationModel({
      ...station,
      id: v4(),
    }).save();
  }

  async updateStation(
    id: string,
    station: Partial<Omit<StationDTO, 'id'>>
  ): Promise<Station | undefined> {
    return await this.stationModel.findOneAndUpdate({ id }, station).exec();
  }

  async deleteStation(id: string): Promise<void> {
    await this.stationModel.findOneAndDelete({ id }).exec();
  }
}
