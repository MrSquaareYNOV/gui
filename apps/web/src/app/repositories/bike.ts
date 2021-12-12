import { BikeDTO } from '../types/bike';

export class BikeRepository {
  private _bikes: BikeDTO[] = [
    {
      id: '0',
      name: 'Velo Test',
      MES: 'Jan 2020',
    },
    {
      id: '1',
      name: 'Velo Prod',
      MES: 'Fev 2020',
    },
    {
      id: '2',
      name: 'Velo PDG',
      MES: 'Oct 2020',
    },
    {
      id: '3',
      name: 'Velo Technique',
      MES: 'Jui 2020',
    },
  ];

  get bikes() {
    return this._bikes;
  }
}
