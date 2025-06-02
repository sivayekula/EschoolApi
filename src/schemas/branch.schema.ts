import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Branch {
  @Prop({ type: String, required: true })
  name: string
  @Prop({type: Object, required: false})
  logo: object
  @Prop({ type: String, required: true })
  email: string
  @Prop({ type: String, required: true })
  mobileNumber: string
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Tenant" })
  tenant: mongoose.Schema.Types.ObjectId
  @Prop({ type: String, required: false})
  contactPerson: string
  @Prop({type: Boolean, required: true, default: false})
  isDefault: boolean
  @Prop({ type: String, required: true })
  organizationCode: string
  @Prop({ type: Number, required: false })
  studentCount: number
  @Prop({ type: Number, required: false })
  smsCount: number
  @Prop({ type: Number, required: false })
  whatsappCount: number
  @Prop({ type: Number, required: false, default: 0 })
  totalSmsUsed: number;
  @Prop({ type: Number, required: false, default: 0 })
  totalWhatsappUsed: number;
  @Prop({ type: Boolean, required: true, default: false })
  portalEnabledStudents: boolean
  @Prop({ type: Boolean, required: true, default: false })
  portalEnabledStaff: boolean
  @Prop({ type: String, required: false })
  whatsappUserId: string
  @Prop({ type: String, required: false })
  whatsappPassword: string
  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

BranchSchema.index({ organizationCode: 1, isDefault: 1 }, { unique: true });