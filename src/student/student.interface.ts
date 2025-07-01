import { Document } from 'mongoose';

export interface IStudent extends Document {
  
  readonly admissionNo: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dob: Date;
  readonly gender: string;
  readonly nationality: string;
  readonly religion: string;
  readonly cast: string;
  readonly subCast: string;
  readonly bloodGroup: string;
  readonly aadharNo: string;
  readonly pic: string;
  readonly aadharPic: string;
  readonly branch: string;
  readonly address: Address;
  
}

interface Address {
  readonly area: string;
  readonly city: string;
  readonly district: string;
  readonly state: string;
  readonly pincode: string;
}