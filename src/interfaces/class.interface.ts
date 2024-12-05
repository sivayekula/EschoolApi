import { Document } from 'mongoose';

export interface IClass extends Document {
  readonly _id: string;
  readonly tenant: string;
  readonly name: string;
  readonly status: string;
}