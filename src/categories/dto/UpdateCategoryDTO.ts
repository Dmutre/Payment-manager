import { IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { validationOptionsMsg } from "src/utils/ValidationMessage";

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  @MinLength(4, validationOptionsMsg('Category name must be between 4 and 20 length'))
  @MaxLength(20, validationOptionsMsg('Category name must be between 4 and 20 length'))
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}