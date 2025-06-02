import { IsEmail, IsNotEmpty, IsString, registerDecorator, ValidationOptions, ValidationArguments, IsOptional } from "class-validator";

export class LoginDto {
  // @IsEmailOrMobile({
  //   message: 'Either a valid email or mobile number must be provided.',
  // })

  @IsString()
  @IsNotEmpty()
  readonly loginId: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly userType: string

  @IsOptional()
  @IsString()
  readonly organizationCode: string
}

export function IsEmailOrMobile(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEmailOrMobile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { email, mobileNumber } = args.object as any;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const mobileRegex = /^[6-9]\d{9}$/; // Adjust regex based on the mobile format needed

          // Validate email or mobile number
          return (
            (email && emailRegex.test(email)) ||
            (mobileNumber && mobileRegex.test(mobileNumber))
          );
        },
        defaultMessage(args: ValidationArguments) {
          return 'Either a valid email or mobile number must be provided.';
        },
      },
    });
  };
}