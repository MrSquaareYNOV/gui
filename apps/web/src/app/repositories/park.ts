import { ParkDTO } from '../types/park';

export class ParkRepository {
  private _parks: ParkDTO[] = [
    {
      id: '0',
      name: 'Park 0',
      location: '0.0,0.0',
      stationsIds: ['0'],
    },
    {
      id: '1',
      name: 'Park 1',
      location: '1.0,0.1',
      stationsIds: ['1'],
    },
  ];

  get parks() {
    return this._parks;
  }
}
