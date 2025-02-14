import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class ClassCategory {
  @Prop({ type: String, required: true, unique: true })
  name: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const ClassCategorySchema = SchemaFactory.createForClass(ClassCategory)