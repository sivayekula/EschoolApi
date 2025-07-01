import { Document } from 'mongoose';

export interface IStaff extends Document {
  readonly _id: string;
  readonly tenant: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly workEmail: string;
  readonly personalEmail: string;
  readonly mobileNumber: string;
  readonly doj: Date;
  readonly disgnation: string;
  readonly dealingSubject: string[];
  readonly profilePic: string;
  readonly dob: Date;
  readonly gender: string;
  readonly fatherName: string;
  readonly presentAddress: string;
  readonly permanentAddress: string;
  readonly aadharPic: string;
  readonly panPic: string;
  readonly role: string;
  readonly status: string;
}