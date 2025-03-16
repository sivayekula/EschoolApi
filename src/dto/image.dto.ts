import { IsString } from "class-validator";

export class ImageDto {
  @IsString()
  Location: string;

  @IsString()
  name: string;
}