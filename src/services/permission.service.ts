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

  async getPermission(roleId: string, tenantId: string, designation?: string) {
    try {
      let query = {role: roleId, tenant: tenantId, status: 'active'};
      if (designation) {
        query['designation'] = designation;
      }
      return await this.permissionModel.findOne(query);
    } catch (error) {
      throw error;
    }
  }
}