import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class SmsTemplate {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  template: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}

export const SmsTemplateSchema = SchemaFactory.createForClass(SmsTemplate);