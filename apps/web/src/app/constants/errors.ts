import { Errors } from '@gui-nx/types';

export const API_ERROR = new Errors([
  { code: 'API_ERROR', message: 'Error while fetching resource from API' },
]);
