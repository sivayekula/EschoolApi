import { Module } from "@nestjs/common";
import { QuickActionsController } from "./quickActions.controller";
import { QuickActionsService } from "./quickActions.service";
import { QuickActionsSchema } from "./quickActions.schema";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'QuickActions', schema: QuickActionsSchema }])
  ],
  controllers: [QuickActionsController],
  providers: [QuickActionsService]
})

export class QuickActionsModule {}