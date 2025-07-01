import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Permission, PermissionsSchema } from "./permissions.schema";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionsSchema },
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService]
})

export class PermissionModule {}