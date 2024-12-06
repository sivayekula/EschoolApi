import { IsDate, IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly workEmail: string;

  @IsMobilePhone()
  @IsNotEmpty()
  readonly mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsDate()
  @IsNotEmpty()
  readonly DOB: Date;

  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @IsString()
  @IsNotEmpty()
  readonly doj: Date;

  @IsString()
  @IsNotEmpty()
  readonly designation: string;

  @IsString()
  @IsNotEmpty()
  readonly presentAddress: string;

  @IsString()
  @IsNotEmpty()
  readonly profilePic: string;

  @IsString()
  @IsNotEmpty()
  readonly aadharPic: string;

  @IsString()
  @IsNotEmpty()
  readonly panPic: string;

  @IsString()
  @IsNotEmpty()
  readonly bankDetails: string;

  @IsString()
  @IsNotEmpty()
  readonly salary: string;

  @IsString()
  @IsNotEmpty()
  readonly fatherName: string;

  @IsString()
  @IsNotEmpty()
  readonly personalEmail: string;

}
