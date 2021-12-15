import { ParkDTO } from '@gui-nx/types';
import { IsString, MinLength, IsArray } from 'class-validator';

export class ParkDTOValidation implements Partial<Omit<ParkDTO, 'id'>> {
  @IsString()
  @MinLength(1)
  name?: string;
  @IsString()
  @MinLength(5)
  location?: string;
  @IsArray()
  stationsIds?: string[];
}
