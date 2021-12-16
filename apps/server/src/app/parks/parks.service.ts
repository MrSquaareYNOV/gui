import { Park, ParkDocument } from '@gui-nx/schema';
import { Errors, ParkDTO } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';

@Injectable()
export class ParksService {
  constructor(@InjectModel(Park.name) private parkModel: Model<ParkDocument>) {}

  async findAll(): Promise<Park[]> {
    return await this.parkModel.find().exec();
  }

  async find(id: string): Promise<Park | undefined> {
    const park = (await this.parkModel.find({ id }).exec())[0];

    if (!park) {
      throw new Errors([{ code: 'PARK_NOT_FOUND', message: 'Park not found' }]);
    }

    return { ...park.toObject() };
  }

  async createPark(park: Omit<ParkDTO, 'id'>): Promise<Park> {
    return await new this.parkModel({ ...park, id: v4() }).save();
  }

  async updatePark(
    id: string,
    park: Partial<Omit<ParkDTO, 'id'>>
  ): Promise<Park | undefined> {
    return await this.parkModel.findOneAndUpdate({ id }, park).exec();
  }

  async deletePark(id: string): Promise<void> {
    await this.parkModel.findOneAndDelete({ id }).exec();
  }
}
