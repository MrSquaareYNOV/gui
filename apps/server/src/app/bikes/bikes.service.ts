import { BikeDTO, Errors } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class BikesService {
  private _bikes: BikeDTO[] = [];

  findAll(): BikeDTO[] {
    return this._bikes;
  }

  find(id: string): BikeDTO | undefined {
    const bike = this._bikes.find((bike) => bike.id === id);

    if (!bike) {
      throw new Errors([{ code: 'BIKE_NOT_FOUND', message: 'Bike not found' }]);
    }

    return { ...bike };
  }

  createBike(bike: Omit<BikeDTO, 'id'>): BikeDTO {
    const newBike = {
      ...bike,
      id: v4(),
    };

    this._bikes.push(newBike);

    return newBike;
  }

  updateBike(
    id: string,
    bike: Partial<Omit<BikeDTO, 'id'>>
  ): BikeDTO | undefined {
    const bikeIdx = this._bikes.findIndex((item) => item.id === id);

    if (bikeIdx === -1) {
      throw new Errors([{ code: 'BIKE_NOT_FOUND', message: 'Bike not found' }]);
    }

    const editedBike = {
      ...this._bikes[bikeIdx],
      ...bike,
      id: id,
    };

    this._bikes.splice(bikeIdx, 1, editedBike);

    return editedBike;
  }

  deleteBike(id: string): void {
    const bikeIdx = this._bikes.findIndex((item) => item.id === id);

    if (bikeIdx === -1) {
      throw new Errors([{ code: 'BIKE_NOT_FOUND', message: 'Bike not found' }]);
    }

    this._bikes.splice(bikeIdx, 1);
  }
}
