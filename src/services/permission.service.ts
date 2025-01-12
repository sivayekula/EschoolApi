import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('Permission') private readonly permissionModel
  ) {}

  async getPermissions() {
    try {
      return await this.permissionModel.find();
    } catch (error) {
      throw error;
    }
  }

  async createPermission(permissionObj) {
    try {
      return await this.permissionModel.updateOne({role: permissionObj.role, tenant: permissionObj.tenant}, permissionObj, {upsert: true, new: true, returnDocument: 'after'});
    } catch (error) {
      throw error;
    }
  }

  async getPermission(roleId: string, tenantId: string) {
    try {
      return await this.permissionModel.findOne({role: roleId, tenant: tenantId, status: 'active'});
    } catch (error) {
      throw error;
    }
  }
}