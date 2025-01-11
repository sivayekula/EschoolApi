import { IsString } from "class-validator";

export class ImageDto {
  @IsString()
  URL: string;

  @IsString()
  ETag: string;

  @IsString()
  type: string;
  
  @IsString()
  size: string;

  @IsString()
  key: string;
}