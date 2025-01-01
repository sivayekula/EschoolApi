import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from './tenant.schema';

@Schema({ timestamps: true })
export class Class extends mongoose.Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "ClassCategory", index: true })
  classCategory: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "tenant", required: false })
  tenant: Tenant;
  
}

export const ClassSchema = SchemaFactory.createForClass(Class);