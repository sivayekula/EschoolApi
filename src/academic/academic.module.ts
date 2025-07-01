import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AcademicController } from "../academic/academic.controller";
import { AcademicService } from "../academic/academic.service";
import { Academics, AcademicSchema } from "../academic/academic.schema";
import { AcademicYearModule } from "../academicYears/academicYear.module";
import { StudentModule } from "../student/student.module";
import { FeeModule } from "../fee/fee.module";
import { StudentFeesModule } from "../studentFees/studentFees.module";

@Module({
  imports: [
    forwardRef(() =>StudentFeesModule),
    MongooseModule.forFeature([
      { name: Academics.name, schema: AcademicSchema },
    ]),
    FeeModule,
    AcademicYearModule,
    StudentModule
  ],
  controllers: [
    AcademicController
  ],
  providers: [
    AcademicService
  ],
  exports: [AcademicService]
})

export class AcademicModule {}