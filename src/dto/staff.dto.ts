import { IsBoolean, IsDate, IsEmail, IsMobilePhone, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString } from "class-validator";


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

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly empId: string;

  @IsString()
  @IsNotEmpty()
  readonly DOJ: Date;

  @IsEmail()
  @IsNotEmpty()
  readonly workEmail: string;

  @IsString()
  @IsNotEmpty()
  readonly designation: string;

  @IsString()
  @IsNotEmpty()
  readonly subjects: string;

  @IsNotEmptyObject()
  readonly profilePic: object;

  @IsString()
  @IsNotEmpty()
  readonly DOB: Date;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsMobilePhone()
  @IsOptional()
  readonly mobileNumber: string;

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

  @IsNotEmptyObject()
  readonly aadharPic: object;

  @IsNotEmptyObject()
  readonly panCardPic: object;

  @IsNotEmptyObject()
  readonly bankDetails: object;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: string;

}
