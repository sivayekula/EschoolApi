import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TimetableController } from "./timetable.controller";
import { TimeTable, TimeTableSchema } from "./timetable.schema";
import { TimetableService } from "./timetable.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimeTable.name, schema: TimeTableSchema },
    ]),
  ],
  controllers: [TimetableController],
  providers: [TimetableService],
  exports: [TimetableService]
})

export class TimetableModule {}