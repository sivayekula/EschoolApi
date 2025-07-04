import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, MinLength, ValidateIf, ValidateNested } from "class-validator";
import { ImageDto } from "../upload/image.dto";


class Address {
  @IsString()
  @IsOptional()
  readonly area: string;

  @IsString()
  @IsOptional()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly state: string;

  @IsString()
  @IsOptional()
  readonly pincode: string;
}

class ParentDetails {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly occupation: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

class Academic {
  @IsString()
  @IsNotEmpty()
  readonly academicYear: string;

  @IsString()
  @IsNotEmpty()
  readonly class: string;

  @IsString()
  @IsNotEmpty()
  readonly board: string;

  @IsString()
  @IsNotEmpty()
  readonly section: string;
}

class PreviousSchool {
  @IsString()
  readonly schoolName: string;

  @IsString()
  readonly yearOfStudy: string;

  @IsString()
  readonly totalMarks: string;

  @IsString()
  readonly classStudied: string;

  @IsNotEmptyObject()
  readonly studyProof: object;
}

class FeesData {

  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly feeName: string;

  @IsNumber()
  @IsNotEmpty()
  readonly totalFee: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isChecked: boolean;

  @IsNumber()
  @IsNotEmpty()
  readonly discount: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: string;

  @IsDateString()
  @IsNotEmpty()
  readonly dueDate: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly installmentAmount: string;
}

export class CreateStudentDto {
  @ValidateIf((obj) =>obj.profilePic !== null)
  @IsOptional()
  @ValidateNested()
  @Type(()=> ImageDto)
  readonly profilePic?: ImageDto | null;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly firstName: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly DOB: Date;

  @IsString()
  @IsOptional()
  readonly mobileNumber: string;

  @IsString()
  @IsOptional()
  readonly UDISE: string;

  @IsString()
  @IsOptional()
  readonly modeOfTransport: string;
  
  @IsString()
  @IsOptional()
  readonly chaildID: string;

  @IsString()
  @IsOptional()
  readonly apparID: string;

  @IsString()
  @IsOptional()
  readonly admissionDetails: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['male', 'female', 'other'])
  readonly gender: string;

  @IsString()
  @IsOptional()
  readonly nationality: string;

  @IsString()
  @IsOptional()
  readonly religion: string;

  @IsString()
  @IsOptional()
  readonly cast: string;

  @IsString()
  @IsOptional()
  readonly subCast: string;

  @IsString()
  @IsOptional()
  readonly bloodGroup: string;

  @IsString()
  @IsNotEmpty()
  readonly aadharNumber: string;

  @ValidateIf((obj) =>obj.aadharPic !== null)
  @IsOptional()
  @ValidateNested()
  @Type(()=> ImageDto)
  readonly aadharPic?: ImageDto | null;

  @IsObject()
  @IsOptional()
  readonly fatherDetails: ParentDetails;

  @IsObject()
  @IsOptional()
  readonly motherDetails: ParentDetails;

  @IsNotEmptyObject()
  readonly presentAddress: Address;

  @IsBoolean()
  @IsNotEmpty()
  readonly isSameAsPresent: boolean;

  @IsNotEmptyObject()
  readonly permanentAddress: Address;

  @ValidateIf((obj) =>obj.parentIdProof !== null)
  @IsOptional()
  @ValidateNested()
  @Type(()=> ImageDto)
  readonly parentIdProof?: ImageDto | null;

  @IsNotEmptyObject()
  readonly academics: Academic;

  @IsString()
  @IsOptional()
  readonly busRoute: string;

  @IsString()
  @IsNotEmpty()
  readonly admissionNumber: string;
  
  @IsString()
  @IsNotEmpty()
  readonly admissionDate: Date;

  @IsOptional()
  readonly previousSchool: PreviousSchool;

  @IsBoolean()
  @IsOptional()
  readonly isDisabled: boolean;

  @IsArray()
  readonly fees: FeesData[];
}
