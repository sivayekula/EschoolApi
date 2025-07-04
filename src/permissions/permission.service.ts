import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Permission } from "./permissions.schema";
import { Model } from "mongoose";

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name) private readonly permissionModel: Model<Permission>
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
      return await this.permissionModel.updateOne({role: permissionObj.role, tenant: permissionObj.tenant, branch: permissionObj.branch, designation: permissionObj.designation}, permissionObj, {upsert: true, new: true, returnDocument: 'after'});
    } catch (error) {
      throw error;
    }
  }

  async getPermission(tenantId: string, branchId?: string, roleId?: string, designation?: string) {
    try {
      let qry = {tenant: tenantId, status: 'active', ...(branchId && {branch: branchId}), ...(roleId && {role: roleId}), ...(designation && {designation: designation})};
      return await this.permissionModel.findOne(qry);
    } catch (error) {
      throw error;
    }
  }
}