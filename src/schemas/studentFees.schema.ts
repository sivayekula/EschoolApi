import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


@Schema({ timestamps: true })
export class StudentFees  extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  student: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  fees: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number, required: true })
  amount: Number;

  @Prop({ type: String, required: true })
  status: string;
}

export const StudentFeesSchema = SchemaFactory.createForClass(StudentFees);