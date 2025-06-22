import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class QuickActions {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Schema.Types.ObjectId;
  @Prop({ type: [String], required: true })
  actions: string[];
  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}

export const QuickActionsSchema = SchemaFactory.createForClass(QuickActions); //SchemaFactory.