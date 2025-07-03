import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Marks, MarksSchema } from "./marks.schema";
import { MarksController } from "./marks.controller";
import { MarksService } from "./marks.service";
import { ExamModule } from "../exams/exam.module";

@Module({
  imports: [
    ExamModule,
    MongooseModule.forFeature([
      { name: Marks.name, schema: MarksSchema },
    ]),
  ],
  controllers: [MarksController],
  providers: [MarksService],
  exports: [MarksService]
})

export class MarksModule {}