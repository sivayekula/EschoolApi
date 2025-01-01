import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class Tenant extends Document {
  
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, unique: true, required: true })
  mobile: string;

  @Prop({
    type: {
      area : { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    }, 
    required: true
  })
  address: {
    area : string,
    city: string,
    state: string,
    pincode: string
  };

  @Prop({ type: String, required: true })
  logo: string;

  @Prop({ type: String, required: true })
  metaInfo: String;

  @Prop({ type: String, required: true, default: "active" })
  status: String

  @Prop({ type: String, required: true })
  createdBy: String
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);