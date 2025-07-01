import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Attendance, AttendanceSchema } from "./attendance.schema";
import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "./attendance.service";
import { Holidays, HolidaysSchema } from "./holidays.schema";
import { HolidaysController } from "./holidays.controller";
import { HolidaysService } from "./holidays.service";
import { AcademicModule } from "../academic/academic.module";
import { NotificationModule } from "../notifications/notification.module";
import { ClassModule } from "../class/class.module";
import { StudentFeesModule } from "../studentFees/studentFees.module";
import { StudentModule } from "src/student/student.module";
import { BranchModule } from "src/branch/branch.module";


@Module({
  imports: [
    ClassModule,
    StudentFeesModule,
    StudentModule,
    MongooseModule.forFeature([
      {name: Attendance.name, schema: AttendanceSchema},
      {name: Holidays.name, schema: HolidaysSchema}
    ]),
    AcademicModule,
    NotificationModule,
    forwardRef(() =>BranchModule)
  ],
  controllers: [AttendanceController, HolidaysController],
  providers: [AttendanceService, HolidaysService],
  exports: [AttendanceService]
})

export class AttendanceModule {}