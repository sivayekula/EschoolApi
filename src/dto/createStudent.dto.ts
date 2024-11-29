import { IsBoolean, IsEnum, IsNotEmpty, IsNotEmptyObject, IsString, MinLength } from "class-validator";

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  readonly admissionNo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly class : string;

  @IsString()
  @IsNotEmpty()
  readonly section : string;

  @IsString()
  @IsNotEmpty()
  readonly acadamicYear : string;

  @IsString()
  @IsNotEmpty()
  readonly dob: Date;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['male', 'female', 'other'])
  readonly gender: string;

  @IsString()
  @IsNotEmpty()
  readonly nationality: string;

  @IsString()
  @IsNotEmpty()
  readonly religion: string;

  @IsString()
  @IsNotEmpty()
  readonly cast: string;

  @IsString()
  @IsNotEmpty()
  readonly subCast: string;

  @IsString()
  readonly bloodGroup: string;

  @IsString()
  @IsNotEmpty()
  readonly aadharNo: string;

  @IsString()
  @IsNotEmpty()
  readonly pic: string;

  @IsString()
  @IsNotEmpty()
  readonly aadharPic: string;

  @IsNotEmptyObject()
  readonly presentAddress: object;

  @IsNotEmptyObject()
  readonly permanentAddress: object;

  @IsNotEmptyObject()
  readonly parentDetails: object;

  @IsBoolean()
  @IsNotEmpty()
  readonly isPerminantAddressSameAsPresentAddress: boolean;

  @IsString()
  @IsNotEmpty()
  readonly addressProof: string;

  @IsString()
  @IsNotEmpty()
  readonly admissionDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  readonly isDisabled: boolean;

  @IsNotEmptyObject()
  readonly acadamicDetails: object;

  @IsNotEmptyObject()
  readonly feesDetails: object;
}