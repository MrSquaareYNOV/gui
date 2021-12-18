import { Bike, BikeDocument } from '@gui-nx/schema';
import { BikeDTO, Errors } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';

@Injectable()
export class BikesService {
  constructor(@InjectModel(Bike.name) private bikeModel: Model<BikeDocument>) {}

  //private _bikes: BikeDTO[] = [];

  async findAll(): Promise<Bike[]> {
    return await this.bikeModel.find().exec();
  }

  async find(id: string): Promise<Bike | undefined> {
    const bike = (await this.bikeModel.find({ id }).exec())[0];

    if (!bike) {
      throw new Errors([{ code: 'BIKE_NOT_FOUND', message: 'Bike not found' }]);
    }

    return { ...bike.toObject() };
  }

  async createBike(bike: Omit<BikeDTO, 'id'>): Promise<Bike> {
    const createdBike = await new this.bikeModel({ ...bike, id: v4() });
    return createdBike.save();
  }

  async updateBike(
    id: string,
    bike: Partial<Omit<BikeDTO, 'id'>>
  ): Promise<Bike | undefined> {
    return await this.bikeModel.findOneAndUpdate({ id }, bike).exec();
  }

  async deleteBike(id: string): Promise<void> {
    await this.bikeModel.findOneAndDelete({ id }).exec();
  }
}
