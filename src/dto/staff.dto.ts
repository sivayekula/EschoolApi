import { IsArray, IsBoolean, IsDate, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString } from "class-validator";
import { ImageDto } from "./image.dto";


class Address {
  @IsString()
  @IsNotEmpty()
  readonly area: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly pincode: string;
}

class Subjects {
  @IsString()
  @IsOptional()
  readonly label: string;

  @IsString()
  @IsOptional()
  readonly value: string;

  @IsBoolean()
  @IsOptional()
  readonly disabled: boolean;

}

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['teaching', 'non-teaching'])
  readonly staffType: string;

  @IsString()
  @IsNotEmpty()
  readonly empId: string;

  @IsString()
  @IsNotEmpty()
  readonly DOJ: Date;

  @IsEmail()
  @IsOptional()
  readonly workEmail: string;

  @IsString()
  @IsNotEmpty()
  readonly designation: string;

  @IsArray()
  @IsOptional()
  readonly subjects: Subjects[];

  @IsOptional()
  readonly profilePic: ImageDto;

  @IsString()
  @IsNotEmpty()
  readonly DOB: Date;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  readonly mobileNumber: number;

  @IsString()
  @IsNotEmpty()
  readonly guardian: string;

  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @IsNotEmptyObject()
  readonly presentAddress: Address;

  @IsBoolean()
  isSameAsPresent: boolean;
  
  @IsNotEmptyObject()
  readonly permanentAddress: Address;

  @IsString()
  @IsNotEmpty()
  readonly aadharNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly panNumber: string;

  @IsOptional()
  readonly aadharPic: ImageDto;

  @IsOptional()
  readonly panCardPic: ImageDto;

  @IsString()
  @IsNotEmpty()
  readonly paymentMode: string;

  @IsString()
  @IsOptional()
  readonly bankName: string;

  @IsString()
  @IsOptional()
  readonly accountNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly ifscCode: string;

  @IsOptional()
  readonly bankPassbook: ImageDto;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: string;

}
