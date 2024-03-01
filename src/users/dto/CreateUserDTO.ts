import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { validationOptionsMsg } from "src/utils/ValidationMessage";

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty(validationOptionsMsg('Username must not be empty'))
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, validationOptionsMsg('Password must be between 4 and 20 length'))
  @MaxLength(20, validationOptionsMsg('Password must be between 4 and 20 length'))
  password: string;
}