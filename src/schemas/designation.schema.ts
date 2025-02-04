import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Designation {

  @Prop({ type: String, required: true })
  staffType: string

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const DesignationSchema = SchemaFactory.createForClass(Designation)