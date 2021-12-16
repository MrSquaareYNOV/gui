import { UserDTO } from '@gui-nx/types';
import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getError } from './utilities';

export class AuthRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  private static _instance?: AuthRepository;

  static get(): AuthRepository {
    if (!this._instance) {
      this._instance = new AuthRepository();
    }

    return this._instance;
  }

  async register(
    userCredentials: Pick<UserDTO, 'email' | 'password'>
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userCredentials
      );

      return response.data.token;
    } catch (e) {
      throw getError(e);
    }
  }

  async login(
    userCredentials: Pick<UserDTO, 'email' | 'password'>
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        userCredentials
      );

      return response.data.token;
    } catch (e) {
      throw getError(e);
    }
  }

  async loginAdmin(
    userCredentials: Pick<UserDTO, 'email' | 'password'>
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/admin/login`,
        userCredentials
      );

      return response.data.token;
    } catch (e) {
      throw getError(e);
    }
  }
}
