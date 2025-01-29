import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class TenantService {
  constructor(
    @InjectModel('Tenant') private readonly tenantModel
  ) {}

  async createTenant(tenantObj) {
    try {
      const tenant = await this.tenantModel.create(tenantObj);
      return tenant;
    } catch (error) {
      throw error;
    }
  }

  async getTenant(tenantId) {
    try {
      return await this.tenantModel.findById({_id:tenantId});
    } catch (error) {
      throw error;
    }
  }

  async getTenants() {
    try {
      return await this.tenantModel.find();
    } catch (error) {
      throw error;
    }
  }
}