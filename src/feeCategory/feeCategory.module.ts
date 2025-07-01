import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FeeCategory, FeeCategorySchema } from "./feeCategory.schema";
import { FeeCategoryController } from "./feeCategory.controller";
import { FeeCategoryService } from "./feeCategory.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeeCategory.name, schema: FeeCategorySchema },
    ]),
  ],
  controllers: [FeeCategoryController],
  providers: [FeeCategoryService],
  exports: [FeeCategoryService],
})

export class FeeCategoryModule {}