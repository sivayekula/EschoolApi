import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BreakTime, BreakTimeSchema } from "./breakTime.schema";
import { BreakTimeController } from "./breakTime.controller";
import { BreakTimeService } from "./breakTime.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BreakTime.name, schema: BreakTimeSchema },
    ]),
  ],
  controllers: [BreakTimeController],
  providers: [BreakTimeService],
  exports: [BreakTimeService],
})

export class BreakTimeModule {}