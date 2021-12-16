import { UserDTO } from '@gui-nx/types';
import axios from 'axios';
import { API_BASE_URL } from '../constants/api';
import { getError } from '../utilities/errors';

export class UserRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  private static _instance?: UserRepository;

  static get(): UserRepository {
    if (!this._instance) {
      this._instance = new UserRepository();
    }

    return this._instance;
  }

  async getUsers(): Promise<UserDTO[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);

      return response.data.users;
    } catch (e) {
      throw getError(e);
    }
  }

  async getUser(id: string): Promise<UserDTO | undefined> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);

      return response.data.user;
    } catch (e) {
      throw getError(e);
    }
  }

  async createUser(user: Omit<UserDTO, 'id'>): Promise<UserDTO> {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, user);

      return response.data.user;
    } catch (e) {
      throw getError(e);
    }
  }

  async editUser(
    id: string,
    user: Partial<Omit<UserDTO, 'id'>>
  ): Promise<UserDTO | undefined> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${id}`, user);

      return response.data.user;
    } catch (e) {
      throw getError(e);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);

      return true;
    } catch (e) {
      throw getError(e);
    }
  }
}
