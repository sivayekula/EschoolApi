import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AcademicYearController } from "./academicYear.controller";
import { AcademicYearSchema } from "./academicYear.schema";
import { AcademicYearService } from "./academicYear.service";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'AcademicYear', schema: AcademicYearSchema }])],
  controllers: [AcademicYearController],
  providers: [AcademicYearService],
  exports: [AcademicYearService]
})

export class AcademicYearModule {}