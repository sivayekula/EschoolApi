import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class FeeGroup {
  @Prop({ type: String, required: true })
  name: string
  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const FeeGroupSchema = SchemaFactory.createForClass(FeeGroup)