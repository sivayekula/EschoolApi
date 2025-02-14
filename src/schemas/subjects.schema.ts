import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from './tenant.schema';

@Schema({ timestamps: true })
export class Subject extends mongoose.Document {

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Boolean, required: true, default: false })
  isDefault: boolean;

  @Prop({ type: String, required: true, enum: ['theory', 'lab', 'extraCurricular'], default: 'theory' })
  category: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "tenant", required: true })
  tenant: Tenant;
  
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);