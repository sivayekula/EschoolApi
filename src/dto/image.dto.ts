import { IsString } from "class-validator";

export class ImageDto {
  @IsString()
  Location: string;

  @IsString()
  ETag: string;

  @IsString()
  name: string;
  
  @IsString()
  Bucket: string;

  @IsString()
  key: string;

  @IsString()
  Key: string;
}