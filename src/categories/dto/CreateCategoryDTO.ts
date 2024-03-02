import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { validationOptionsMsg } from "src/utils/ValidationMessage";

export class CreateCategoryDTO {
  @ApiProperty({ 
    description: 'Name of the category (must be between 4 and 20 characters)', 
    minLength: 4,
    maxLength: 20
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4, validationOptionsMsg('Category name must be between 4 and 20 length'))
  @MaxLength(20, validationOptionsMsg('Category name must be between 4 and 20 length'))
  name: string;

  @ApiProperty({ 
    description: 'Description of the category (optional)' 
  })
  @IsOptional()
  @IsString()
  description?: string;
}
