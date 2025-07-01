import { Module } from "@nestjs/common";
import { FeeController } from "./fee.controller";
import { FeeService } from "./fee.service";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationModule } from "../notifications/notification.module";
import { Fee, FeeSchema } from "./fee.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fee.name, schema: FeeSchema }]),
    NotificationModule
  ],
  controllers: [
    FeeController
  ],
  providers: [
    FeeService,
  ],
  exports: [FeeService]
})

export class FeeModule {}