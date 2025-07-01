import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FeeGroup, FeeGroupSchema } from "./feeGroup.schema";
import { FeeGroupController } from "./feeGroup.controller";
import { FeeGroupService } from "./feeGroup.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeeGroup.name, schema: FeeGroupSchema },
    ]),
  ],
  controllers: [FeeGroupController],
  providers: [FeeGroupService],
  exports: [FeeGroupService],
})

export class FeeGroupModule {}