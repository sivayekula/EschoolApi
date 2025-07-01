import { forwardRef, Module } from "@nestjs/common";
import { Tenant, TenantSchema } from "./tenant.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { TenantController } from "./tenant.controller";
import { TenantService } from "./tenant.service";
import { CommonModule } from "../common/common.module";
import { AcademicModule } from "../academic/academic.module";
import { RoleModule } from "../roles/role.module";
import { NotificationModule } from "src/notifications/notification.module";
import { BranchModule } from "src/branch/branch.module";
import { AcademicYearModule } from "src/academicYears/academicYear.module";
import { StudentModule } from "src/student/student.module";
import { StaffModule } from "src/staff/staff.module";
import { UserModule } from "src/user/user.module";
import { PermissionModule } from "src/permissions/permission.module";
import { GlobalPermissionsModule } from "src/globalPermissions/globalPermissions.module";


@Module({
  imports: [
    PermissionModule,
    RoleModule,
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
    ]),
    forwardRef(() => CommonModule),
    AcademicModule,
    NotificationModule,
    BranchModule,
    AcademicYearModule,
    StudentModule,
    StaffModule,
    UserModule,
    GlobalPermissionsModule
  ],
  controllers: [ TenantController ],
  providers: [ TenantService ],
  exports: [ TenantService ]
})

export class TenantModule {}