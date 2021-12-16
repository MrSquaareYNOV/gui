import { Errors } from '@gui-nx/types';
import axios, { AxiosError } from 'axios';

export const getError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.data.errors) {
      return new Errors(axiosError.response.data.errors);
    } else {
      return new Errors([
        {
          code: 'API_ERROR',
          message: axiosError.message,
        },
      ]);
    }
  }

  return new Errors([
    {
      code: 'API_ERROR',
      message: 'Unknown error',
    },
  ]);
};
