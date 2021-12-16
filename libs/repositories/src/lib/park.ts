import { ParkDTO } from '@gui-nx/types';
import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getError } from './utilities';

export class ParkRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  private static _instance?: ParkRepository;

  static get(): ParkRepository {
    if (!this._instance) {
      this._instance = new ParkRepository();
    }

    return this._instance;
  }

  async getParks(): Promise<ParkDTO[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/parks`);

      return response.data.parks;
    } catch (e) {
      throw getError(e);
    }
  }

  async getPark(id: string): Promise<ParkDTO | undefined> {
    try {
      const response = await axios.get(`${API_BASE_URL}/parks/${id}`);

      return response.data.park;
    } catch (e) {
      throw getError(e);
    }
  }

  async createPark(park: Omit<ParkDTO, 'id'>): Promise<ParkDTO> {
    try {
      const response = await axios.post(`${API_BASE_URL}/parks`, park);

      return response.data.park;
    } catch (e) {
      throw getError(e);
    }
  }

  async editPark(
    id: string,
    park: Partial<Omit<ParkDTO, 'id'>>
  ): Promise<ParkDTO | undefined> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/parks/${id}`, park);

      return response.data.park;
    } catch (e) {
      throw getError(e);
    }
  }

  async deletePark(id: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/parks/${id}`);

      return true;
    } catch (e) {
      throw getError(e);
    }
  }
}
