import { BikeDTO, Errors } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bike, BikeDocument } from '@gui-nx/schema';
import { Model } from 'mongoose';

@Injectable()
export class BikesService {
  constructor(@InjectModel(Bike.name) private bikeModel: Model<BikeDocument>) {
  }

  //private _bikes: BikeDTO[] = [];

  async findAll(): Promise<Bike[]> {
    return await this.bikeModel.find().exec();
  }

  async find(id: string): Promise<Bike | undefined> {

    const bike = await this.bikeModel.findById(id).exec();

    if (!bike) {
      throw new Errors([{ code: 'BIKE_NOT_FOUND', message: 'Bike not found' }]);
    }

    return { ...bike };
  }

  async createBike(bike: Omit<BikeDTO, 'id'>): Promise<Bike> {
    const createdBike = await new this.bikeModel(bike);
    return createdBike.save();
  }

  async updateBike(
    id: string,
    bike: Partial<Omit<BikeDTO, 'id'>>
  ): Promise<Bike | undefined> {
    return await this.bikeModel.findByIdAndUpdate(id, bike).exec();
  }

  async deleteBike(id: string): Promise<void> {
    await this.bikeModel.findByIdAndDelete(id).exec();
    /*
    const bikeIdx = this._bikes.findIndex((item) => item.id === id);

    if (bikeIdx === -1) {
      throw new Errors([{ code: 'BIKE_NOT_FOUND', message: 'Bike not found' }]);
    }

    this._bikes.splice(bikeIdx, 1);
     */
  }
}
