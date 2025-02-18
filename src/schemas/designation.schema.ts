import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({ timestamps: true })
export class Designation {

  @Prop({ type: String, required: true })
  staffType: string

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true, default: 'active' })
  status: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId
}

export const DesignationSchema = SchemaFactory.createForClass(Designation)

DesignationSchema.index(
  { name: 1, tenant: 1 },
  { unique: true, partialFilterExpression: { status: "active" } }
)