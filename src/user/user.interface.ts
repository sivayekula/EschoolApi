import { Document } from 'mongoose';
import { Role } from '../roles/role.schema';

export interface IUser extends Document {
  readonly _id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly mobileNumber: string;
  readonly address: Address;
  readonly role: Role;
}

interface Address {
  readonly area: string;
  readonly city: string;
  readonly district: string;
  readonly state: string;
  readonly pincode: string;
}