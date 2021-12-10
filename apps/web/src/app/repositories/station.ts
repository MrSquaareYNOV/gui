import { StationDTO } from '../types/station';

export class StationRepository {
  private _stations: StationDTO[] = [
    {
      id: '0',
      name: 'Station 0',
      location: '0.0,0.0',
      currentBikesIds: ['0', '1'],
      totalBikes: 10,
    },
    {
      id: '1',
      name: 'Station 1',
      location: '1.0,0.1',
      currentBikesIds: ['2', '3'],
      totalBikes: 10,
    },
  ];

  get stations() {
    return this._stations;
  }
}
