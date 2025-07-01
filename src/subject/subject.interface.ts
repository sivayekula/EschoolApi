import { Document } from 'mongoose';

export interface ISubject extends Document {
  readonly tenant: string;
  readonly name: string;
  readonly status: string;
}

// export interface RSubject extends Document {
//   readonly _id: string;
//   readonly tenant: string;
//   readonly name: string;
//   readonly status: string;
// }