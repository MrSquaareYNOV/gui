import { BikeDTO } from '@gui-nx/types';

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

  async getBike(id: string): Promise<BikeDTO | undefined> {
    return this._bikes.find((bike) => bike.id === id);
  }

  async getBikes(): Promise<BikeDTO[]> {
    return this._bikes;
  }
}
