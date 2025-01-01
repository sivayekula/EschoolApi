import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class AcademicYear {

  @Prop({ type: String, required: true })
  year: string

  @Prop({ type: String, required: true, default: 'active' })
  status: string

}

export const AcademicYearSchema = SchemaFactory.createForClass(AcademicYear);