import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class Staff extends mongoose.Document {

  @Prop({ type: String, required: true, enum: ['teaching', 'non-teaching']})
  staffType: string;

  @Prop({ type: String, required: true})
  firstName: string;

  @Prop({ type: String, required: false})
  lastName: string;

  @Prop({ type: String, required: true})
  empId: string;

  @Prop({ type: Date, required: true})
  DOJ: Date;

  @Prop({ type: String, required: false})
  workEmail: string;

  @Prop({ type: String, required: true})
  mobileNumber: string;

  @Prop({type: Boolean, required: true, default: false})
  isPortalLoginEnabled: boolean;

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: "Role"})
  role: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Designation"})
  designation: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Array, required: true})
  subjects: Array<{value: string, label: string, disabled: boolean}>;
  
  @Prop({ type: Object, required: false})
  profilePic: object;
  
  @Prop({ type: Date, required: true})
  DOB: Date;

  @Prop({ type: String, required: false})
  email: string;

  @Prop({ type: String, required: true})
  guardian: string;

  @Prop({ type: String, required: true})
  gender: string;

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
    area : string,
    city : string,
    state : string,
    pincode : string
  };

  @Prop({ type: Boolean, required: true})
  isSameAsPresent: Boolean;

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
    area : string,
    city : string,
    state : string,
    pincode : string
  };

  @Prop({ type: String, required: true})
  aadharNumber: string;

  @Prop({ type: String, required: false})
  panNumber: string;

  @Prop({ type: Object, required: false})
  aadharPic: object;

  @Prop({ type: Object, required: false})
  panCardPic: object;

  @Prop({ type: String, required: true})
  paymentMode: string;

  @Prop({ type: String, required: false})
  accountNumber: string;

  @Prop({ type: String, required: false})
  bankName: string;

  @Prop({ type: String, required: false})
  ifscCode: string;

  @Prop({ type: String, required: false})
  bankPassbook: string

  @Prop({ type: Number, required: true})
  amount: number;

  @Prop({ type: String, required: true})
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Branch" })
  branch: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true})
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true})
  createdBy: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true, default: 'active' })
  status: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);

// Hash the password before saving the document
StaffSchema.pre('save', async function (next) {
  const staff = this as Staff;

  // Only hash the password if it has been modified (or is new)
  if (!staff.isModified('password')) {
    return next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  staff.password = await bcrypt.hash(staff.password, salt);
  next();
});