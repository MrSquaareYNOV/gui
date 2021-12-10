import { BikeDTO } from '../types/bike';

export class BikeRepository {
  private _bikes: BikeDTO[] = [
    {
      id: '0',
    },
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
  ];

  get bikes() {
    return this._bikes;
  }
}
