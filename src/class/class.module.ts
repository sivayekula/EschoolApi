import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Class, ClassSchema } from "./class.schema";
import { ClassController } from "./class.controller";
import { ClassService } from "./class.service";
import { SectionModule } from "../section/section.module";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
    ]),
    SectionModule
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})

export class ClassModule {}