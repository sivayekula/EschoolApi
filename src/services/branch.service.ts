import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class BranchService {
  constructor(@InjectModel('Branch') private readonly branchModel) {}

  async findAll(tenantId: string, isDefault?: boolean) {
    tenantId = tenantId !== 'global' ? tenantId : null
    try {
      let qry = {status: 'active', ...(tenantId && {tenant: tenantId}), ...(isDefault && {isDefault: true})};
      return await this.branchModel.find(qry).populate('tenant');
    } catch (error) {
      throw error;
    }
  }

  async createBranch(branch: any) {
    try {
      return await this.branchModel.create(branch);
    } catch (error) {
      throw error;
    }
  }

  async getBranch(id: string) {
    try {
      return await this.branchModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateBranch(id: string, branch: any) {
    try {
      return await this.branchModel.findByIdAndUpdate(id, branch);
    } catch (error) {
      throw error;
    }
  }

  async deleteBranch(id: string) {
    try {
      return await this.branchModel.findByIdAndUpdate(id, { status: 'inactive' });
    } catch (error) {
      throw error;
    }
  }
}