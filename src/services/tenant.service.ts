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

  async getTenantByLoginId(loginId) {
    try {
      return await this.tenantModel.findOne({$or:[{email:loginId}, {mobileNumber:loginId}], status: 'active'});
    } catch (error) {
      throw error;
    }
  }

  async getTenant(tenantId) {
    try {
      if(tenantId == 'global'){
        return {}
      }
      return await this.tenantModel.findById({_id:tenantId});
    } catch (error) {
      throw error;
    }
  }

  async getTenants() {
    try {
      return await this.tenantModel.find({status: 'active'});
    } catch (error) {
      throw error;
    }
  }

  async deleteTenant(tenantId) {
    try {
      return await this.tenantModel.findByIdAndDelete(tenantId);
    } catch (error) {
      throw error;
    }
  }
}