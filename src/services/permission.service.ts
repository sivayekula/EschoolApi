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

  async getPermission(tenantId: string, roleId?: string, designation?: string) {
    try {
      let query = designation ? {tenant: tenantId, designation: designation, status: 'active'} : {role: roleId, tenant: tenantId, status: 'active'};
      return await this.permissionModel.findOne(query);
    } catch (error) {
      throw error;
    }
  }
}