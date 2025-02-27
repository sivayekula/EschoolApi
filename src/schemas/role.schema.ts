import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {

  @Prop({ type: String, required: false })
  tenant: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  name: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

  @Prop({ type: String, required: true })
  createdBy: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.index(
  { name: 1, tenant: 1 },
  { unique: true }
);