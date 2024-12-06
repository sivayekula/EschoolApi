import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Staff {
  @Prop({ type: String, required: true})
  firstName: string;

  @Prop({ type: String, required: true})
  lastName: string;

  @Prop({ type: String, required: true})
  workEmail: string;

  @Prop({ type: String, required: true})
  password: string;

  @Prop({ type: Date, required: true})
  doj: Date;

  @Prop({ type: String, required: true})
  disgnation: string;

  @Prop({ type: [String], required: true})
  dealingSubject: string[];

  @Prop({ type: String, required: true})
  profilePic: string;

  @Prop({ type: Date, required: true})
  dob: Date;

  @Prop({ type: String, required: true})
  gender: string;

  @Prop({ type: String, required: true})
  fatherName: string;

  @Prop({ type: String, required: true})
  personalEmail: string;

  @Prop({ type: String, required: true})
  mobileNumber: string;

  @Prop({ type: String, required: true})
  presentAddress: string;

  @Prop({ type: String, required: true})
  permanentAddress: string;

  @Prop({ type: Boolean, required: true, default: false})
  isPermanentAddressSame: Boolean;

  @Prop({ type: String, required: true})
  qualification: string;

  @Prop({ type: String, required: true})
  experience: string;

  @Prop({ type: String, required: true})
  aadharPic: string;

  @Prop({ type: String, required: true})
  panPic: string;

  @Prop({ type: String, required: true})
  accountNumber: string;

  @Prop({ type: String, required: true})
  bankName: string;

  @Prop({ type: String, required: true})
  ifscCode: string;

  @Prop({ type: String, required: true})
  branchName: string;

  @Prop({ type: String, required: true})
  bankPic: string;

  @Prop({ type: String, required: true})
  payRoll: string;

  @Prop({ type: String, required: true})
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true})
  tenant: mongoose.Schema.Types.ObjectId
}

export const StaffSchema = SchemaFactory.createForClass(Staff);