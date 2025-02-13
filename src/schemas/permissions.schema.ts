import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


@Schema({ timestamps: true })
export class Permissions {

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Role" })
  role: mongoose.Schema.Types.ObjectId

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

  @Prop({ type: String, ref: "Tenant", required: true })
  tenant: string

  @Prop({ type: String, required: true, default: 'active' })
  status: string
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);