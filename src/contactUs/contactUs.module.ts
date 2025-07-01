import { Module } from "@nestjs/common";
import { ContactUsController } from "./contactUs.controller";
import { ContactUsService } from "./contactUs.service";

@Module({
  imports: [],
  controllers: [ContactUsController],
  providers: [ContactUsService],
  exports: []
})

export class ContactUsModule { }