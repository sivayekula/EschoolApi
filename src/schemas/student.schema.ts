import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from './tenant.schema';
import { Role } from './role.schema';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class Student  extends mongoose.Document {
  
  @Prop({ type: String, required: true, unique: true })
  admissionNo: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Date, required: true })
  dob: Date;

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
  aadharNo: string;

  @Prop({ type: String, required: true })
  pic : string;

  @Prop({ type: String, required: true })
  aadharPic : string;

  @Prop({
    type: {
      fatherName: { type: String, required: true },
      fatherOccupation: { type: String, required: true },
      fatherMobile: { type: String, required: true },
      fatherEmail: { type: String, required: true },
      motherName: { type: String, required: true },
      motherOccupation: { type: String, required: true },
      motherMobile: { type: String, required: true },
      motherEmail: { type: String, required: true },
    },
    required: true
  })
  parentDetails: {
    fatherName: string;
    fatherOccupation: string;
    fatherMobile: string;
    fatherEmail: string;
    motherName: string;
    motherOccupation: string;
    motherMobile: string;
    motherEmail: string;
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
  perminantAddress: {
    area: string;
    city: string;
    state: string;
    pincode: string;
  };

  @Prop({ type: String, required: true })
  addressProof: string;

  @Prop({ type: Boolean, required: true })
  isPerminantAddressSameAsPresentAddress: boolean;

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
  
  @Prop({ type: Date, required: true })
  admissionDate: Date;

  @Prop({ type: Boolean, required: true })
  isDisabled: boolean;

  @Prop({ type: String })
  identityMark: string;

  @Prop({
    type: [{
      acadamicYear: { type: String, required: true },
      class: { type: String, required: true },
      schoolName: { type: String, required: true },
      obtainMarks: { type: Number, required: true },
      documentProof: { type: String, required: true }, // study certificate or transfer certificate or any other proof
    }],
    default: [],
  })
  prevSchoolDetails: Array<{
    acadamicYear: string;
    class: string;
    schoolName: string;
    obtainMarks: number;
    documentProof: string;
  }>;

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
