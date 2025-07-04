import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Permission {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Role" })
  role: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Designation' })
  designation: mongoose.Schema.Types.ObjectId

  @Prop({ type: Array, required: true })
  permissions: {
    name: string,
    read: boolean,
    submenu: {
      name: string,
      read: boolean,
      write: boolean,
      delete: boolean,
      edit: boolean
    }[]
  }[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true })
  tenant: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true })
  branch: mongoose.Schema.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const PermissionsSchema = SchemaFactory.createForClass(Permission);