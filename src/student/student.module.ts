import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { Student, StudentSchema } from "./student.schema";
import { FeeModule } from "../fee/fee.module";
import { AcademicModule } from "../academic/academic.module";
import { RoleModule } from "../roles/role.module";
import { StudentFeesModule } from "src/studentFees/studentFees.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    forwardRef(() => AcademicModule),
    FeeModule,
    RoleModule,
    forwardRef(() =>StudentFeesModule)
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})

export class StudentModule {}