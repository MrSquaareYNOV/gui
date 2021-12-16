import { UserDTO, UserPermission } from '@gui-nx/types';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class UserDTOValidation implements Partial<Omit<UserDTO, 'id'>> {
  @IsString()
  @MinLength(1)
  email?: string;
  @IsString()
  @MinLength(1)
  password?: string;
  @IsNumber()
  permission?: UserPermission;
}
