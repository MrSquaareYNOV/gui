import { ParkDTO, Errors } from '@gui-nx/types';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class ParksService {
  private _parks: ParkDTO[] = [];

  findAll(): ParkDTO[] {
    return this._parks;
  }

  find(id: string): ParkDTO | undefined {
    const park = this._parks.find((park) => park.id === id);

    if (!park) {
      throw new Errors([{ code: 'PARK_NOT_FOUND', message: 'Park not found' }]);
    }

    return { ...park };
  }

  createPark(park: Omit<ParkDTO, 'id'>): ParkDTO {
    const newPark = {
      ...park,
      id: v4(),
    };

    this._parks.push(newPark);

    return newPark;
  }

  updatePark(
    id: string,
    park: Partial<Omit<ParkDTO, 'id'>>
  ): ParkDTO | undefined {
    const parkIdx = this._parks.findIndex((item) => item.id === id);

    if (parkIdx === -1) {
      throw new Errors([{ code: 'PARK_NOT_FOUND', message: 'Park not found' }]);
    }

    const editedPark = {
      ...this._parks[parkIdx],
      ...park,
      id: id,
    };

    this._parks.splice(parkIdx, 1, editedPark);

    return editedPark;
  }

  deletePark(id: string): void {
    const parkIdx = this._parks.findIndex((item) => item.id === id);

    if (parkIdx === -1) {
      throw new Errors([{ code: 'PARK_NOT_FOUND', message: 'Park not found' }]);
    }

    this._parks.splice(parkIdx, 1);
  }
}
