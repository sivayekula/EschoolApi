import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GlobalPermissions, GlobalPermissionsSchema } from "./globalPermissions.schema";
import { GlobalPermissionsService } from "./globalPermissions.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GlobalPermissions.name,
        schema: GlobalPermissionsSchema
      }
    ])
  ],
  controllers: [],
  providers: [GlobalPermissionsService],
  exports: [GlobalPermissionsService]
})

export class GlobalPermissionsModule {}