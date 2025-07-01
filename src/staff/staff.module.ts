import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Staff, StaffSchema } from "./staff.schema";
import { Designation, DesignationSchema } from "./designation.schema";
import { StaffController } from "./staff.controller";
import { DesignationController } from "./designation.controller";
import { StaffService } from "./staff.service";
import { DesignationService } from "./designation.service";
import { CommonModule } from "../common/common.module";
import { RoleModule } from "../roles/role.module";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Staff.name , schema: StaffSchema },
      { name: Designation.name, schema: DesignationSchema }
    ]),
    forwardRef(() => CommonModule),
    RoleModule
  ],
  controllers: [ StaffController, DesignationController ],
  providers: [ StaffService, DesignationService ],
  exports: [ StaffService, DesignationService ]
})

export class StaffModule {}