import { BikeDTO } from '@gui-nx/types';
import { IsString, MinLength } from 'class-validator';

export class BikeDTOValidation implements Partial<Omit<BikeDTO, 'id'>> {
  @IsString()
  @MinLength(1)
  name?: string;
}
