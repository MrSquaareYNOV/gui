import { BikeDTO, Errors } from '@gui-nx/types';
import { v4 } from 'uuid';

export class BikeRepository {
  private _bikes: BikeDTO[] = [
    {
      id: '0',
      name: 'Bike 0',
    },
    {
      id: '1',
      name: 'Bike 1',
    },
    {
      id: '2',
      name: 'Bike 2',
    },
    {
      id: '3',
      name: 'Bike 3',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  private static _instance?: BikeRepository;

  static get(): BikeRepository {
    if (!this._instance) {
      this._instance = new BikeRepository();
    }

    return this._instance;
  }

  async createBike(bike: Omit<BikeDTO, 'id'>): Promise<BikeDTO> {
    const newBike = {
      ...bike,
      id: v4(),
    };

    this._bikes.push(newBike);

    return newBike;
  }

  async editBike(
    id: string,
    bike: Partial<Omit<BikeDTO, 'id'>>
  ): Promise<BikeDTO | undefined> {
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

  async deleteBike(id: string): Promise<boolean> {
    const bikeIdx = this._bikes.findIndex((item) => item.id === id);

    if (bikeIdx === -1) {
      throw new Errors([{ code: 'BIKE_NOT_FOUND', message: 'Bike not found' }]);
    }

    this._bikes.splice(bikeIdx, 1);

    return true;
  }

  async getBike(id: string): Promise<BikeDTO | undefined> {
    const bike = this._bikes.find((bike) => bike.id === id);

    if (!bike) {
      throw new Errors([{ code: 'BIKE_NOT_FOUND', message: 'Bike not found' }]);
    }

    return { ...bike };
  }

  async getBikes(): Promise<BikeDTO[]> {
    return [...this._bikes];
  }
}
