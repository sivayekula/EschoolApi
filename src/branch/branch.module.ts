import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Branch, BranchSchema } from "./branch.schema";
import { BranchController } from "./branch.controller";
import { BranchService } from "./branch.service";
import { AcademicModule } from "../academic/academic.module";
import { AcademicYearModule } from "../academicYears/academicYear.module";


@Module({
  imports: [
    forwardRef(() =>AcademicModule),
    AcademicYearModule,
    MongooseModule.forFeature([
      { name: Branch.name, schema: BranchSchema }
    ]),
  ],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService]
})

export class BranchModule {}