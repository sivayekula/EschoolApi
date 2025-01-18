import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

class SubjectMarks {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Subject" })
    subject: mongoose.Schema.Types.ObjectId
    @Prop({ type: Number, required: true })
    marks: number
}

@Schema({ timestamps: true })
export class Marks {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Student" })
    student: mongoose.Schema.Types.ObjectId
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Class" })
    class: mongoose.Schema.Types.ObjectId
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Section" })
    section: mongoose.Schema.Types.ObjectId
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Exam" })
    exam: mongoose.Schema.Types.ObjectId
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "AcademicYear" })
    academicYear: mongoose.Schema.Types.ObjectId
    @Prop({ type: [SubjectMarks], required: true })
    marks: SubjectMarks[]
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Tenant" })
    tenant: mongoose.Schema.Types.ObjectId
    @Prop({ type: String, required: true, default: 'active' })
    status: string
}

export const MarksSchema = SchemaFactory.createForClass(Marks);