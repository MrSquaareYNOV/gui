import { ParkDTO, Errors } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Park, ParkDocument } from '@gui-nx/schema';

@Injectable()
export class ParksService {
  constructor(@InjectModel(Park.name) private parkModel: Model<ParkDocument>) {
  }

  async findAll(): Promise<Park[]> {
    return await this.parkModel.find().exec();
  }

  async find(id: string): Promise<Park | undefined> {
    const park = await this.parkModel.findById(id).exec();

    if (!park) {
      throw new Errors([{ code: 'PARK_NOT_FOUND', message: 'Park not found' }]);
    }

    return { ...park };
  }

  async createPark(park: Omit<ParkDTO, 'id'>): Promise<Park> {
    const createdPark = await new this.parkModel(park);
    return createdPark.save();
  }

  async updatePark(
    id: string,
    park: Partial<Omit<ParkDTO, 'id'>>
  ): Promise<Park | undefined> {
    /*
       if (userIdx === -1) {
      throw new Errors([{ code: 'USER_NOT_FOUND', message: 'User not found' }]);
    }
     */
    return await this.parkModel.findByIdAndUpdate(id, park).exec();
  }

  async deletePark(id: string): Promise<void> {
    await this.parkModel.findByIdAndDelete(id).exec();
  }
}
