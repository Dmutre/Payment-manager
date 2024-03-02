import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/ValidationMessage';

export class LoginUserDTO {
  @ApiProperty({
    description: 'Username of the user',
    minLength: 4,
    maxLength: 20,
    example: 'john_doe',
  })
  @IsString()
  @MinLength(
    4,
    validationOptionsMsg('Username must be between 4 and 20 characters'),
  )
  @MaxLength(
    20,
    validationOptionsMsg('Username must be between 4 and 20 characters'),
  )
  @IsNotEmpty({ message: 'Username must not be empty' })
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 4,
    maxLength: 20,
    example: 'strongpassword',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @MinLength(
    4,
    validationOptionsMsg('Password must be between 4 and 20 characters'),
  )
  @MaxLength(
    20,
    validationOptionsMsg('Password must be between 4 and 20 characters'),
  )
  password: string;
}
