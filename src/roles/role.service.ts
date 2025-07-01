import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {}

  async getRole(roleName: string) {
    try {
      return await this.roleModel.findOne({ name: roleName });
    } catch (error) {
      throw error;
    }
  }

  async getRoles(tenantId: string) {
    try {
      let query =
        tenantId && tenantId !== 'global'
          ? {
              $or: [{ tenant: tenantId }, { tenant: 'global' }],
              status: 'active',
              name: { $ne: 'superadmin' },
            }
          : {
              status: 'active',
              name: { $ne: 'superadmin' },
            };
      return await this.roleModel.find(query);
    } catch (error) {
      throw error;
    }
  }

  async createRole(roleObj) {
    try {
      return await this.roleModel.create(roleObj);
    } catch (error) {
      throw error;
    }
  }
}
