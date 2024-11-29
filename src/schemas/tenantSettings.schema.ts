import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from './tenant.schema';


@Schema({ timestamps: true })
export class TenantSettings extends mongoose.Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true, ref: "tenant" })
  tenantId: Tenant;

  @Prop({ type: Number, required: true, default: 0 })
  maxStudentsAllowed: number;

  @Prop({ type: Number, required: true, default: 0 })
  maxSmsAllowed: number;

  @Prop({ type: Number, required: true, default: 0 })
  totalSmsUsed: number;
}

export const TenantSettingsSchema = SchemaFactory.createForClass(TenantSettings);