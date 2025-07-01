import { Module } from "@nestjs/common";
import { DashboardController } from "./dashboard.controller";
import { HealthController } from "./health.controller";
import { StaffModule } from "../staff/staff.module";
import { TransactionsModule } from "../transactions/transactions.module";
import { AcademicModule } from "../academic/academic.module";
import { LoginController } from "./login/login.controller";
import { LoginService } from "./login/login.service";
import { StudentModule } from "../student/student.module";
import { BranchModule } from "../branch/branch.module";
import { UserModule } from "../user/user.module";
import { TerminusModule } from "@nestjs/terminus";
import { AcademicYearModule } from "src/academicYears/academicYear.module";
import { JwtModule } from "@nestjs/jwt";
import { PermissionModule } from "src/permissions/permission.module";

@Module({
  imports: [
    TerminusModule,
    AcademicYearModule,
    StaffModule,
    TransactionsModule,
    AcademicModule,
    StudentModule,
    BranchModule,
    UserModule,
    PermissionModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'brBsTtEcOywyQGSAynpcnA==',
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [
    DashboardController,
    HealthController,
    LoginController,
  ],
  providers: [LoginService],
  exports: []
})

export class CommonModule {}