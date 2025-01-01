import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class Student extends mongoose.Document {

  @Prop({ type: Object, required: true })
  profilePic : object;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Date, required: true })
  DOB: Date;

  @Prop({ type: String, required: true, enum: ['male', 'female', 'other'] })
  gender: string;

  @Prop({ type: String, required: true })
  nationality: string;

  @Prop({ type: String, required: true })
  religion: string;

  @Prop({ type: String, required: true })
  cast: string;

  @Prop({ type: String, required: true })
  subCast: string;

  @Prop({ type: String })
  bloodGroup: string;

  @Prop({ type: String, required: true, unique: true })
  aadharNumber: string;

  @Prop({ type: Object, required: true })
  aadharPic : object;
  @Prop({
    type: {
      name: { type: String, required: true },
      occupation: { type: String, required: true },
      mobileNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
    required: true
  })
  fatherDetails: {
    name: string;
    occupation: string;
    mobileNumber: string;
    email: string;
  }

  @Prop({
    type: {   
      name: { type: String, required: true },
      occupation: { type: String, required: true },
      mobileNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
    required: true
  })
  motherDetails: {
    name: string;
    occupation: string;
    mobileNumber: string;
    email: string;
  };

  @Prop({
    type: {
      area : { type: String, required: true },
      city : { type: String, required: true },
      state : { type: String, required: true },
      pincode : { type: String, required: true },
    },
    required: true
  })
  presentAddress: {
    area: string;
    city: string;
    state: string;
    pincode: string;
  };

  @Prop({
    type: { 
      area : { type: String, required: true },
      city : { type: String, required: true },
      state : { type: String, required: true },
      pincode : { type: String, required: true },
    },
    required: true
  })
  permanentAddress: {
    area: string;
    city: string;
    state: string;
    pincode: string;
  };

  @Prop({ type: Boolean, required: true })
  isSameAsPresent: boolean;

  @Prop({ type: Object, required: true })
  parentIdProof: object;
  
  @Prop({ type: String, required: true, unique: true })
  admissionNumber: string;

  @Prop({ type: Date, required: true })
  admissionDate: Date;

  @Prop({ type: Boolean, required: false })
  isDisabled: boolean;

  @Prop({
    type: {
      schoolName: { type: String, required: false },
      yearOfStudy: { type: String, required: false },
      totalMarks: { type: Number, required: false },
      classStudied: { type: String, required: false },
      studyProof: { type: Object, required: false }, // study certificate or transfer certificate or any other proof
    },
    default: {},
  })
  previousSchool: {
    schoolName: string;
    yearOfStudy: string;
    totalMarks: number;
    classStudied: number;
    studyProof: object;
  };

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "tenant", required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "role", required: true })
  role: mongoose.Schema.Types.ObjectId
 
  @Prop({ type: String })
  metaInfo: string

  @Prop({ type: String, required: true })
  createdBy: string

  @Prop({ type: String, required: true, default: 'active' })
  status: string

}

export const StudentSchema = SchemaFactory.createForClass(Student);

// Hash the password before saving the document
StudentSchema.pre('save', async function (next) {
  const student = this as Student;

  // Only hash the password if it has been modified (or is new)
  if (!student.isModified('password')) {
    return next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);
  next();
});
