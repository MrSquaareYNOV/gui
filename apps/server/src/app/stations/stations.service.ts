import { StationDTO, Errors } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class StationsService {
  private _stations: StationDTO[] = [
    {
      id: "21323",
      name: "lastation",
      location: "43.604652,1.444209",
      currentBikesIds: ["43652", "14209"],
      totalBikes: 2
    }
  ];

  findAll(): StationDTO[] {
    return this._stations;
  }

  find(id: string): StationDTO | undefined {
    const station = this._stations.find((station) => station.id === id);

    if (!station) {
      throw new Errors([
        { code: 'STATION_NOT_FOUND', message: 'Station not found' },
      ]);
    }

    return { ...station };
  }

  createStation(station: Omit<StationDTO, 'id'>): StationDTO {
    const newStation = {
      ...station,
      id: v4(),
    };

    this._stations.push(newStation);

    return newStation;
  }

  updateStation(
    id: string,
    station: Partial<Omit<StationDTO, 'id'>>
  ): StationDTO | undefined {
    const stationIdx = this._stations.findIndex((item) => item.id === id);

    if (stationIdx === -1) {
      throw new Errors([
        { code: 'STATION_NOT_FOUND', message: 'Station not found' },
      ]);
    }

    const editedStation = {
      ...this._stations[stationIdx],
      ...station,
      id: id,
    };

    this._stations.splice(stationIdx, 1, editedStation);

    return editedStation;
  }

  deleteStation(id: string): void {
    const stationIdx = this._stations.findIndex((item) => item.id === id);

    if (stationIdx === -1) {
      throw new Errors([
        { code: 'STATION_NOT_FOUND', message: 'Station not found' },
      ]);
    }

    this._stations.splice(stationIdx, 1);
  }
}
