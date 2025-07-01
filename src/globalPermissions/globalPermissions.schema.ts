import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

class SubMenu {
  @Prop({ type: String, required: false })
  name: string
  @Prop({ type: String, required: false })
  title: string
  @Prop({ type: Boolean, required: false })
  read: boolean
  @Prop({ type: Boolean, required: false })
  write: boolean
  @Prop({ type: Boolean, required: false })
  edit: boolean
  @Prop({ type: Boolean, required: false })
  delete: boolean
}
class Menu {
  @Prop({ type: String, required: true })
  name: string
  @Prop({ type: Boolean, required: true })
  read: boolean
  @Prop({ type: String, required: true })
  title: string
  @Prop({ type: SubMenu, required: false })
  submenu: SubMenu
}

@Schema({ timestamps: true })
export class GlobalPermissions {
  @Prop({ type: Menu, required: true })
  permissions: Menu
}

export const GlobalPermissionsSchema = SchemaFactory.createForClass(GlobalPermissions);