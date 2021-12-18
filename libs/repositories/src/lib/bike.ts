import { BikeDTO } from '@gui-nx/types';
import axios from 'axios';

import { API_BASE_URL } from './constants';
import { getError } from './utilities';

export class BikeRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  private static _instance?: BikeRepository;

  static get(): BikeRepository {
    if (!this._instance) {
      this._instance = new BikeRepository();
    }

    return this._instance;
  }

  async getBikes(): Promise<BikeDTO[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/bikes`);

      return response.data.bikes;
    } catch (e) {
      throw getError(e);
    }
  }

  async getBike(id: string): Promise<BikeDTO | undefined> {
    try {
      const response = await axios.get(`${API_BASE_URL}/bikes/${id}`);

      return response.data.bike;
    } catch (e) {
      throw getError(e);
    }
  }

  async createBike(token: string, bike: Omit<BikeDTO, 'id'>): Promise<BikeDTO> {
    try {
      const response = await axios.post(`${API_BASE_URL}/bikes`, bike, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.bike;
    } catch (e) {
      throw getError(e);
    }
  }

  async editBike(
    token: string,
    id: string,
    bike: Partial<Omit<BikeDTO, 'id'>>
  ): Promise<BikeDTO | undefined> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/bikes/${id}`, bike, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.bike;
    } catch (e) {
      throw getError(e);
    }
  }

  async deleteBike(token: string, id: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/bikes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch (e) {
      throw getError(e);
    }
  }
}
