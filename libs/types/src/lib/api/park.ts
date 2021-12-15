import { ParkDTO } from '../park';

export type APIParks = {
  parks: ParkDTO[];
};

export type APIPark = {
  park: ParkDTO;
};
