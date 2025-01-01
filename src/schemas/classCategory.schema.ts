import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class ClassCategory {
  @Prop({ type: String, required: true, unique: true })
  name: string

  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const ClassCategorySchema = SchemaFactory.createForClass(ClassCategory)