import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UpdateQuery } from 'mongoose';
import { IUser } from './user.interface';

@Schema({ timestamps: true })
export class User extends mongoose.Document {

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: false })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  mobileNumber: string;

  @Prop({
    type: {
      area: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },
    required: true
  })
  address : {
    area: string,
    city: string,
    state: string,
    pincode: string
  }

  @Prop({type: Object, required: false})
  profilePic : object

  @Prop({ type: String, required: true, default: 'active' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Tenant" })
  tenant: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role" })
  role: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: false })
  deviceId: string;

  @Prop({ type: String, required: false })
  deviceType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this as User;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as UpdateQuery<IUser>;

  // Skip if update is an aggregation pipeline
  if (!update || Array.isArray(update)) {
    return next();
  }
  // If the password is being updated, hash it
  // Check if password is being updated via $set
  if (update.$set && update.$set.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(update.$set.password, salt);
    update.$set.password = hashedPassword;
    this.setUpdate(update);
  }

  next();
});
