import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FeeSubCategory, FeeSubCategorySchema } from "./feeSubCategory.schema";
import { FeeSubCategoryController } from "./feeSubCategory.controller";
import { FeeSubCategoryService } from "./feeSubCategory.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FeeSubCategory.name,
        schema: FeeSubCategorySchema,
      },
    ]),
  ],
  controllers: [FeeSubCategoryController],
  providers: [FeeSubCategoryService],
  exports: [FeeSubCategoryService],
})

export class FeeSubCategoryModule {}