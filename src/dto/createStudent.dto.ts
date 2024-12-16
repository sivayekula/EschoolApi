import { IsArray, IsBoolean, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, MinLength } from "class-validator";


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

class Acadamic {
  @IsString()
  @IsNotEmpty()
  readonly acadamicYear: string;

  @IsString()
  @IsNotEmpty()
  readonly class: string;

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

  @IsString()
  readonly studyProof: string;
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

  @IsNumber()
  @IsNotEmpty()
  readonly installmentAmount: string;
}

export class CreateStudentDto {

  @IsString()
  @IsNotEmpty()
  readonly profilePic: string;

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
  readonly DOB: Date;

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
  readonly aadharNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly aadharPic: string;

  @IsNotEmptyObject()
  readonly fatherDetails: ParentDetails;

  @IsNotEmptyObject()
  readonly motherDetails: ParentDetails;

  @IsNotEmptyObject()
  readonly presentAddress: Address;

  @IsBoolean()
  @IsNotEmpty()
  readonly isSameAsPresent: boolean;

  @IsNotEmptyObject()
  readonly permanentAddress: Address;

  @IsString()
  @IsNotEmpty()
  readonly parentIdProof: string;

  @IsNotEmptyObject()
  readonly acadamicDetails: Acadamic;

  @IsString()
  @IsNotEmpty()
  readonly admissionNumber: string;
  
  @IsString()
  @IsNotEmpty()
  readonly admissionDate: Date;

  readonly previousSchool: PreviousSchool;

  @IsBoolean()
  @IsOptional()
  readonly isDisabled: boolean;

  @IsArray()
  readonly feesData: FeesData[];
}
