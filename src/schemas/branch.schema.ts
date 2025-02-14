import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Branch {
  @Prop({ type: String, required: true })
  name: string
  @Prop({type: Object, required: false})
  logo: object
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId
  @Prop({type: Boolean, required: true, default: false})
  isDefault: boolean
  @Prop({ type: Number, required: true })
  studentCount: number
  @Prop({ type: Number, required: true })
  smsCount: number
  @Prop({ type: Number, required: true })
  whatsappCount: number
  @Prop({ type: Number, required: true, default: 0 })
  totalSmsUsed: number;
  @Prop({ type: Number, required: true, default: 0 })
  totalWhatsappUsed: number;
  @Prop({ type: Boolean, required: true, default: false })
  portalEnabledStudents: boolean
  @Prop({ type: Boolean, required: true, default: false })
  portalEnabledStaff: boolean
  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const BranchSchema = SchemaFactory.createForClass(Branch);