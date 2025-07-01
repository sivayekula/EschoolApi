import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Subject extends mongoose.Document {

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, enum: ['theory', 'lab', 'extraCurricular'], default: 'theory' })
  category: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "tenant", required: true })
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "branch", required: true })
  branch: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId;
  
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.index(
  { name: 1, tenant: 1, branch: 1 },
  { unique: true, partialFilterExpression: { status: "active" } }
);