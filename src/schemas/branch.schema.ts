import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Branch {
  @Prop({ type: String, required: true })
  name: string
  @Prop({ type: Object, required: true })
  address: object
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId
  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const BranchSchema = SchemaFactory.createForClass(Branch);