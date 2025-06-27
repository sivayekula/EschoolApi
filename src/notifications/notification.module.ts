import { Module } from "@nestjs/common";
import { TemplateSchema } from "./templates/template.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { TemplateController } from "./templates/template.controller";
import { TemplateService } from "./templates/template.service";
import { SmsService } from "./sms/sms.service";
import { WhatsAppService } from "./whatsApp/whatsApp.service";
import { SmsController } from "./sms/sms.controller";
import { WhatsAppController } from "./whatsApp/whatsApp.controller";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SmsTemplate', schema: TemplateSchema }])
  ],
  controllers: [TemplateController, SmsController, WhatsAppController, NotificationController],
  providers: [TemplateService, SmsService, WhatsAppService, NotificationService],
  exports: [TemplateService, SmsService, WhatsAppService]
})

export class NotificationModule {}