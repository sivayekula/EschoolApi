import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


 export class SubjectMarks extends mongoose.Document{
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Subject" })
    subject: mongoose.Schema.Types.ObjectId
    @Prop({ type: Number, required: true })
    marks: number
}

export class StudentMarks extends mongoose.Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Student" })
    student: mongoose.Schema.Types.ObjectId
    @Prop({ type: [SubjectMarks], required: true })
    marks : SubjectMarks[]
}

@Schema({ timestamps: true })
export class Marks extends mongoose.Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Exams" })
    exam: mongoose.Schema.Types.ObjectId

    @Prop({ type: StudentMarks, required: true })
    marksDetails: StudentMarks

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Tenant" })
    tenant: mongoose.Schema.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Branch" })
    branch: mongoose.Schema.Types.ObjectId

    @Prop({ type: Number, required: true })
    passPercentage: number

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    createdBy: mongoose.Schema.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "AcademicYear" })
    academicYear: mongoose.Schema.Types.ObjectId

    @Prop({ type: String, required: true, default: 'active' })
    status: string
}

export const MarksSchema = SchemaFactory.createForClass(Marks);