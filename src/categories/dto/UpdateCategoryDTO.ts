import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { validationOptionsMsg } from "src/utils/ValidationMessage";

export class UpdateCategoryDTO {
  @ApiProperty({ 
    description: 'Optional. New name for the category (must be between 4 and 20 characters)', 
    minLength: 4,
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @MinLength(4, validationOptionsMsg('Category name must be between 4 and 20 length'))
  @MaxLength(20, validationOptionsMsg('Category name must be between 4 and 20 length'))
  name: string;

  @ApiProperty({ 
    description: 'Optional. New description for the category' 
  })
  @IsOptional()
  @IsString()
  description?: string;
}
