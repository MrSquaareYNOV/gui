import { UserDTO } from '@gui-nx/types';
import { IsString, MinLength } from 'class-validator';

export class UserDTOValidation implements Partial<Omit<UserDTO, 'id'>> {
  @IsString()
  @MinLength(1)
  email?: string;
  @IsString()
  @MinLength(1)
  password?: string;
}
