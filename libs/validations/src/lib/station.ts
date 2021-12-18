import { StationDTO } from '@gui-nx/types';
import { IsArray, IsNumber,IsString, MinLength } from 'class-validator';

export class StationDTOValidation implements Partial<Omit<StationDTO, 'id'>> {
  @IsString()
  @MinLength(1)
  name?: string;
  @IsString()
  @MinLength(5)
  location?: string;
  @IsArray()
  currentBikesIds?: string[];
  @IsNumber()
  totalBikes?: number;
}
