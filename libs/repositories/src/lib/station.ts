import { StationDTO } from '@gui-nx/types';
import axios from 'axios';

import { API_BASE_URL } from './constants';
import { getError } from './utilities';

export class StationRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  private static _instance?: StationRepository;

  static get(): StationRepository {
    if (!this._instance) {
      this._instance = new StationRepository();
    }

    return this._instance;
  }

  async getStations(): Promise<StationDTO[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/stations`);

      return response.data.stations;
    } catch (e) {
      throw getError(e);
    }
  }

  async getStation(id: string): Promise<StationDTO | undefined> {
    try {
      const response = await axios.get(`${API_BASE_URL}/stations/${id}`);

      return response.data.station;
    } catch (e) {
      throw getError(e);
    }
  }

  async createStation(station: Omit<StationDTO, 'id'>): Promise<StationDTO> {
    try {
      const response = await axios.post(`${API_BASE_URL}/stations`, station);

      return response.data.station;
    } catch (e) {
      throw getError(e);
    }
  }

  async editStation(
    id: string,
    station: Partial<Omit<StationDTO, 'id'>>
  ): Promise<StationDTO | undefined> {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/stations/${id}`,
        station
      );

      return response.data.station;
    } catch (e) {
      throw getError(e);
    }
  }

  async deleteStation(id: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/stations/${id}`);

      return true;
    } catch (e) {
      throw getError(e);
    }
  }
}
