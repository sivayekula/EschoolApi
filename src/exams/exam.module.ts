import { Module } from "@nestjs/common";
import { ExamController } from "./exam.controller";
import { ExamService } from "./exam.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ExamSchema } from "./exam.schema";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Exams', schema: ExamSchema },
    ])
  ],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService]
})

export class ExamModule {}