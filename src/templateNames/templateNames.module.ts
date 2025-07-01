import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TemplateNames, TemplateNamesSchema } from "./templateNames.schema";
import { TemplateNamesController } from "./templateNames.controller";
import { TemplateNamesService } from "./templateNames.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TemplateNames.name, schema: TemplateNamesSchema },
    ]),
  ],
  controllers: [TemplateNamesController],
  providers: [TemplateNamesService],
  exports: [TemplateNamesService]
})

export class TemplateNamesModule { }